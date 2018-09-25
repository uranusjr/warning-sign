const application = Stimulus.Application.start()

class ButtonGroup extends Stimulus.Controller {

	static get targets() {
		return ['button', 'title']
	}

	toggle(event) {
		this.titleTarget.classList.add('enabled')
		this.buttonTargets.forEach(e => {
			if (e === event.target) {
				e.classList.add('enabled')
			} else {
				e.classList.remove('enabled')
			}
		})
	}
}

application.register('group', ButtonGroup)


// Scale content to screen.
document.addEventListener('DOMContentLoaded', function () {
	const board = document.querySelector('.board')
	const xs = (window.innerWidth - 64) / board.offsetWidth
	const ys = (window.innerHeight - 64) / board.offsetHeight
	const scale = Math.min(xs, ys)

	document.querySelector('body').style['margin'] = `${32 / scale}px`
	board.style['transform'] = `translate(0, -50%) scale(${scale})`
})
