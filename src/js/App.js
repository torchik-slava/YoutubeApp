import Controller from './Controller.js';

export default class App {

	constructor () {
		this.controller  = new Controller();
	}

	start () {
		this.controller.drawer.drawFrame ();
		document.body.querySelector('.search_btn').addEventListener('click', () => this.controller.search());
		document.body.querySelector('.next').addEventListener('click', () => this.controller.nextMove());
    document.body.querySelector('.prev').addEventListener('click', () => this.controller.prevMove ());
    window.addEventListener('touchstart', (e) => this.controller.trackTouchPosition(e));
    window.addEventListener('touchend', (e) => this.controller.makeSwiping(e));
		window.addEventListener('resize', () => this.controller.delayFix());
		addEventListener('keydown', () => {
			if (event.keyCode == 13) this.controller.search();
			if (event.keyCode == 39) this.controller.nextMove();
			if (event.keyCode == 37) this.controller.prevMove ();
		})
	}
}
