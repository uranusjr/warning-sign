(function () {

function getBoard() {
	return document.querySelector('.board')
}

const application = Stimulus.Application.start()

class ButtonGroup extends Stimulus.Controller {

	static get targets() {
		return ['button']
	}

	toggle(event) {
		this.buttonTargets.forEach(e => {
			const btn = event.target.closest('div')
			if (e === btn) {
				e.classList.toggle('enabled')
			} else {
				e.classList.remove('enabled')
			}
		})
	}
}

class Settings extends Stimulus.Controller {

	static get targets() {
		return ['input']
	}

	_setBoardSize(value) {
		getBoard().style['font-size'] = `${value}%`
	}

	setBoardSize(event) {
		this._setBoardSize(event.target.value)
	}

	connect() {
		this._setBoardSize(this.inputTarget.value)
	}
}

application.register('group', ButtonGroup)
application.register('settings', Settings)


// Scale content to screen.
function resize() {
	const windowW = window.innerWidth - 64
	const windowH = window.innerHeight - 64

	// Fix height, scale width to fit.
	const board = getBoard()
	const boardHeight = windowH / windowW * board.scrollWidth
	const boardScale = windowW / board.scrollWidth
	board.style['height'] = `${boardHeight}px`
	board.style['transform'] = `translate(-50%, -50%) scale(${boardScale})`
}
document.addEventListener('DOMContentLoaded', resize)
window.addEventListener('resize', resize)

})()
