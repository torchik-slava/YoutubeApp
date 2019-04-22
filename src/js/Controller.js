import InfoLoader from './InfoLoader.js';
import Drawer from './Drawer.js';

export default class Controller {

	constructor () {
		this.delayState = false;
		this.loader = new InfoLoader();
		this.drawer = new Drawer();
		
	}

	nextMove () {
		let position = Math.max(this.drawer.position - this.drawer.frameLength, - this.drawer.cardLength * (document.body.querySelectorAll('.card').length - this.drawer.cardsAmount));
  	this.drawer.moveAt(position);
  	this.drawer.showPagin();  	
  	this._loadMore();  
  	
	}

	prevMove () {
		let position = Math.min(this.drawer.position + this.drawer.frameLength, 0)
  	this.drawer.moveAt(position);
  	this.drawer.showPagin();  
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
		const viewedCardsNumber = -(this.drawer.position/this.drawer.cardLength); console.log('viewedCardsNumber' + viewedCardsNumber);
		this.drawer.calcCoordinates(); 		
		const newPosition = - (viewedCardsNumber*this.drawer.cardLength);
		this.drawer.moveAt(newPosition);
		this._loadMore();
		this.drawer.showPagin();
		this.delayState = true; console.log('finish state: ' + this.delayState + 'Resize have worked');		    	  
	}

	_loadMore () {
		if (-(this.drawer.position/this.drawer.cardLength)+this.drawer.cardsAmount*2>document.body.querySelectorAll('.card').length) {
			this.loader.loadInfo(undefined, data => this.drawer.drawCards(data));
			console.log('Новые данные загружены!');			
		} else this.drawer.loaderShow(false);
	}

  search () {    
		let field = document.getElementById('search');
		if (field.value!='') {
			this.delayState = true;                                                 //можно как-то попозже впихнуть
			this.drawer.loaderShow(true);      	    
	    this.drawer.clearCarusel();	    
	    if(this.loader.pageParams.pageToken) delete this.loader.pageParams.pageToken;            	    
      this.loader.loadInfo(field.value, data => this.drawer.drawCards(data));        
  	} else field.placeholder = 'Type here smth, please!';
	}	
}