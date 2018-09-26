const application = Stimulus.Application.start()

class ButtonGroup extends Stimulus.Controller {

	static get targets() {
		return ['button', 'title']
	}

	toggle(event) {
		this.buttonTargets.forEach(e => {
			if (e === event.target) {
				e.classList.toggle('enabled')
			} else {
				e.classList.remove('enabled')
			}
		})
		if (event.target.classList.contains('enabled')) {
			this.titleTarget.classList.add('enabled')
		} else {
			this.titleTarget.classList.remove('enabled')
		}
	}
}

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
