import {Application, Controller} from 'stimulus'


class ButtonGroup extends Controller {

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

const application = Application.start()
application.register('group', ButtonGroup)


// Scale content to screen.
function resize() {
	const board = document.querySelector('.board')
	const xs = (window.innerWidth - 64) / board.offsetWidth
	const ys = (window.innerHeight - 64) / board.offsetHeight
	board.style['transform'] = `translate(0, -50%) scale(${Math.min(xs, ys)})`
}
document.addEventListener('DOMContentLoaded', resize)
window.addEventListener('resize', resize)
