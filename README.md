Personal Project, do not use.


樣式都在 `src/assets/board.css` 這個檔案裡面


### 改顏色

找到下面這段：

```css
.board .group-buttons > .enabled {
  background: 黃色;
}
.board .group-buttons > .enabled:first-child {
  background: 紅色;
}
```

顏色是用 hex 色碼，可以用這個工具來看：https://color.adobe.com/

上面顏色調好之後，把對應的 hex 欄位貼過去即可（記得前面要加 `#`）


### 改字型大小

找到這段：

```css
.board .group {
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 縮放比例;
}
```

調整 `font-size` 的百分比（例如 `110%`）即可。


### 打包

需要 Python 3.7：https://www.python.org/downloads/release/python-371/

安裝之後在目錄下執行

    py -3.7 pack.py

會自動在 `dist` 目錄裡產生打包好的 zip 檔。

