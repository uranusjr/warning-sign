const application = Stimulus.Application.start()

class ButtonGroup extends Stimulus.Controller {

	static get targets() {
		return ['button']
	}

	toggle(event) {
		this.buttonTargets.forEach(e => {
			if (e === event.target) {
				e.classList.toggle('enabled')
			} else {
				e.classList.remove('enabled')
			}
		})
	}
}

application.register('group', ButtonGroup)


// Scale content to screen.
function resize() {
	const windowW = window.innerWidth - 64
	const windowH = window.innerHeight - 64

	// Fix height, scale width to fit.
	const board = document.querySelector('.board')
	const boardHeight = windowH / windowW * board.scrollWidth
	const boardScale = windowW / board.scrollWidth
	board.style['height'] = `${boardHeight}px`
	board.style['transform'] = `translate(-50%, -50%) scale(${boardScale})`
}
document.addEventListener('DOMContentLoaded', resize)
window.addEventListener('resize', resize)
