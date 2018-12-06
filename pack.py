import os
import pathlib
import shutil
import tempfile
import typing
import urllib.request
import zipfile


NW_JS_URL: str = "https://dl.nwjs.io/v0.35.0/nwjs-v0.35.0-win-x64.zip"

ROOT_DIR: pathlib.Path = pathlib.Path(__file__).parent.resolve()
DIST_DIR: pathlib.Path = ROOT_DIR.joinpath("dist")

TARGET_NAME: str = "warning-sign"

BLACKLIST_ROOT_DIRS: typing.Set[str] = {".git", ".vscode", "dist"}
BLACKLIST_FILES: typing.Set[str] = {".gitignore", ".gitattributes", "pack.py"}


def get_nw_js_zip(workdir: pathlib.Path) -> pathlib.Path:
    print("Downloading nw.js distribution...")
    target = workdir.joinpath("nwjs.zip")
    print(f"  {NW_JS_URL} -> {target}")
    urllib.request.urlretrieve(NW_JS_URL, filename=str(target))
    return target


def _clean_dirnames_for_root(dirnames: typing.List[str]):
    indexes = [i for i, v in enumerate(dirnames) if v in BLACKLIST_ROOT_DIRS]
    for i in reversed(indexes):
        dirnames.pop(i)


def build_package(workdir: pathlib.Path) -> pathlib.Path:
    print("Archiving project...")
    target = workdir.joinpath(TARGET_NAME + ".zip")
    print(f"  into {target}")
    with zipfile.ZipFile(str(target), "w") as zf:
        for dirname, dirnames, filenames in os.walk(ROOT_DIR):
            if os.path.samefile(dirname, ROOT_DIR):
                _clean_dirnames_for_root(dirnames)
            for fn in filenames:
                if fn in BLACKLIST_FILES:
                    continue
                arcname = os.path.join(os.path.relpath(dirname, ROOT_DIR), fn)
                print(f"    {arcname}")
                zf.write(os.path.join(dirname, fn), arcname)
    return target


def collect_dist(
        workdir: pathlib.Path, nw_js_zip: pathlib.Path,
        package: pathlib.Path) -> pathlib.Path:
    print("Building dist...")
    rootdir = workdir.joinpath("nwjs")

    # Extract NW.js distribution.
    print(f"  into {rootdir}")
    with zipfile.ZipFile(str(nw_js_zip)) as zf:
        zf.extractall(str(rootdir))

    # Flatten structure.
    top_level = rootdir.iterdir()
    dirname = next(top_level)
    try:
        next(top_level)
    except StopIteration:
        rootdir = rootdir.joinpath(dirname)

    # Create exe by concating nw.exe and the .nw file.
    nw_exe = rootdir.joinpath("nw.exe")
    target = rootdir.joinpath(TARGET_NAME + ".exe")
    print(f"  combining {target}")
    with target.open("wb") as ft, \
            nw_exe.open("rb") as f1, package.open("rb") as f2:
        shutil.copyfileobj(f1, ft)
        shutil.copyfileobj(f2, ft)

    # Remove nw.exe.
    nw_exe.unlink()

    return rootdir


def archive_dist(rootdir: pathlib.Path):
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir()

    target = DIST_DIR.joinpath("dist.zip")
    print(f"  packaging into {target}")
    with zipfile.ZipFile(str(target), "w") as zf:
        for dirname, dirnames, filenames in os.walk(rootdir):
            for fn in filenames:
                arcname = os.path.join(os.path.relpath(dirname, rootdir), fn)
                zf.write(os.path.join(dirname, fn), arcname)

    return target


def main():
    with tempfile.TemporaryDirectory() as tempdir:
        workdir = pathlib.Path(tempdir)
        dist = archive_dist(collect_dist(
            workdir,
            get_nw_js_zip(workdir),
            build_package(workdir),
        ))
    print(f"\nCreated\n  {dist}")


if __name__ == "__main__":
    main()
