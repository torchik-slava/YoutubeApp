export default class Drawer {

  constructor () {
		this.frameLength = 0;
    this.cardLength = 0;
		this.cardsAmount = 0;
		this.position = 0;
  }

	calcCoordinates () {
		this.frameLength = document.body.querySelector('.ul_frame').getBoundingClientRect().width;
		this.cardsAmount = Math.floor(this.frameLength/document.body.querySelector('.card').offsetWidth);
		this.cardLength = this.frameLength/this.cardsAmount;
	}

	drawFrame () {
		let fragment = document.createDocumentFragment();
  	fragment.appendChild(frame_tepml.content.cloneNode(true));
		document.body.appendChild(fragment);
	}

	showPagin () {
		let first = Math.round(-(this.position/this.cardLength)+1);
		let last = first+this.cardsAmount-1;
		if (first!=last) {
			document.body.querySelector('.pagination').textContent = first + ' - ' + last + ' out of ' + document.body.querySelectorAll('.card').length;
		} else document.body.querySelector('.pagination').textContent = first + ' out of ' + document.body.querySelectorAll('.card').length;

	}

	moveAt (position) {
		this.position = position;
		document.body.querySelector('ul').style.marginLeft = this.position + 'px';
	}

  _showControls (confirmation) {
		if (confirmation){
			document.body.querySelector('.prev').style.visibility = 'visible';
    	document.body.querySelector('.next').style.visibility = 'visible';
		} else {
			document.body.querySelector('.prev').style.visibility = 'hidden';
    	document.body.querySelector('.next').style.visibility = 'hidden';
		}
  }

	clearCarusel () {
		this.moveAt(0);
		document.body.querySelector('ul').innerHTML = '';
    document.body.querySelector('.pagination').innerHTML = '';
    document.body.querySelector('.prev').style.visibility = '';
    document.body.querySelector('.next').style.visibility = '';
	}

	_fillCard (item, content) {
	  item.querySelector('img').setAttribute('src', content.snippet.thumbnails.medium.url);
	  item.querySelector('a').setAttribute('href', 'https://www.youtube.com/watch?v=' + content.id);
	  item.querySelector('a').innerHTML = content.snippet.title;
	  item.querySelector('.author span').textContent = content.snippet.channelTitle;
	  item.querySelector('.author span').title = content.snippet.channelTitle;
	  item.querySelector('.date span').textContent = content.snippet.publishedAt.slice(0,10);
	  item.querySelector('.views span').textContent = content.statistics.viewCount;
	  item.querySelector('.likes span').textContent = content.statistics.likeCount || 'live';
	  item.querySelector('.dislikes span').textContent = content.statistics.dislikeCount || 'live';
	  item.querySelector('.comments span').textContent = content.statistics.commentCount || 'live';
	  item.querySelector('.video_description').innerHTML += content.snippet.description || 'no description to this video';
	  item.querySelector('.video_description').title = content.snippet.description;
	}

	loaderShow (confirmation) {
		let loaderBlock = document.getElementById('loader');
		if(confirmation) {
			loaderBlock.style.display = 'flex';
			this._showControls(false);
		} else {
			loaderBlock.style.display = '';
			this._showControls(true);
		}
	}

	drawCards (data) {
		let fragment = document.createDocumentFragment();
  	for (let i = 0; i < data.items.length; i++) {
    	let card = document.createElement('li');
    	card.classList.add('card');
    	card.appendChild(card_tepml.content.cloneNode(true));
    	this._fillCard(card, data.items[i]);
      fragment.appendChild(card);
  	}
		document.body.querySelector('ul').appendChild(fragment);
		this.calcCoordinates();
    this.loaderShow(false);
    if(-(this.position/this.cardLength) + this.cardsAmount > document.body.querySelectorAll('.card').length - data.items.length) {this.showPagin();}
	}
}