import InfoLoader from './InfoLoader.js';
import Drawer from './Drawer.js';

export default class Controller {

	constructor () {
    this.touchPosition = null;
		this.delayState = false;
		this.loader = new InfoLoader();
		this.drawer = new Drawer();

	}

	nextMove () {
		if (-this.drawer.position/this.drawer.cardLength + this.drawer.cardsAmount*2 > document.body.querySelectorAll('.card').length
  		&& this.loader.pageParams['pageToken'] != 'last page') {
  		this.drawer.loaderShow(true);
  	} else {
      let position = Math.max(this.drawer.position - this.drawer.frameLength, - this.drawer.cardLength * (document.body.querySelectorAll('.card').length - this.drawer.cardsAmount));
  		this.drawer.moveAt(position);
  		this.drawer.showPagin();
  		this._loadMore();
  	}
	}

	prevMove () {
		let position = Math.min(this.drawer.position + this.drawer.frameLength, 0)
  	this.drawer.moveAt(position);
  	this.drawer.showPagin();
  }

  trackTouchPosition (event) {
    this.touchPosition = event.changedTouches[0].clientX;
  }

  makeSwiping (event) {
    let lastTouchPosition = event.changedTouches[0].clientX;
    let screenSize = event.view.innerWidth;
    let result = (this.touchPosition - lastTouchPosition)/screenSize;
    if (result > 0.3) this.nextMove();
    if (result < -0.3) this.prevMove();
  }

	delayFix () {
		if(this.delayState) {
			this.delayState = false; console.log('start state: ' + this.delayState);
			this.drawer.loaderShow(true);
			const that = this;
			setTimeout (function() {that.moveAfterResize()}, 1000);
		} else return;
	}

	moveAfterResize () {
		const viewedCardsNumber = -(this.drawer.position/this.drawer.cardLength);
		this.drawer.calcCoordinates();
		const newPosition = - (viewedCardsNumber*this.drawer.cardLength);
		this.drawer.moveAt(newPosition);
    this.drawer.showPagin();
    this._loadMore();
		this.delayState = true; console.log('finish state: ' + this.delayState + 'Resize have worked');
	}

	_loadMore () {
		if (-(this.drawer.position/this.drawer.cardLength)+this.drawer.cardsAmount*2>document.body.querySelectorAll('.card').length
		&& this.loader.pageParams['pageToken'] != 'last page') {
			this.loader.loadInfo(undefined, data => this.drawer.drawCards(data));
			console.log('Новые данные загружены!');
		} else {
      this.drawer.loaderShow(false);
		}
	}

  search () {
		let field = document.getElementById('search');
		if (field.value!='') {
			this.delayState = true;
			this.drawer.loaderShow(true);
	    this.drawer.clearCarusel();
	    if(this.loader.pageParams.pageToken) delete this.loader.pageParams.pageToken;
      this.loader.loadInfo(field.value, data => this.drawer.drawCards(data));
  	} else field.placeholder = 'Type here smth, please!';
	}
}
