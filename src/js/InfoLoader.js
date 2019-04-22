export default class InfoLoader {

	constructor () {
		this.baseLink='https://www.googleapis.com/youtube/v3/';		
		this.requestType=['search?', 'videos?'];
		this.key='key=AIzaSyDZNHGnWB1CwZWdHqm82mCufM1wnQJU0w4';
		this.pageParams = {			
			'perPage': 'maxResults=15',
      'resultType': 'part=snippet',             			 	
      'type': 'type=video',      
    };
		this.videoParams = {			
			'resultType': 'part=snippet,statistics',             			 	
      'id': 'id=',      
    };
	}

	_linkGenerate (params, reqType) {
		let url = this.baseLink+reqType+this.key;		
		for (let i in params) {
    	url +='&' + params[i]; 
  	}  	  	
  	return url;
	}

	_loadDetails (url) {		
		return fetch (url)
		.then(res => res.json())
		.catch(alert)
	}
	
	loadInfo (query, callback) {
		if(this.pageParams['pageToken'] === 'last page') return;
		if(query) this.pageParams['q'] = 'q=' + query;		
		fetch(this._linkGenerate(this.pageParams, this.requestType[0]))
		.then(res => res.json())
		.then(data => {
			data.nextPageToken ? this.pageParams['pageToken'] = 'pageToken=' + data.nextPageToken : this.pageParams['pageToken'] = 'last page'; 
			this.videoParams['id'] = 'id=';
			for (let i = 0; i < data.items.length; i++) {
				this.videoParams.id += data.items[i].id.videoId +','; 
			}
			this.videoParams.id = this.videoParams.id.slice(0,-1);
			return this.videoParams;
		})
		.then(options => this._linkGenerate(options, this.requestType[1]))
		.then(link => this._loadDetails(link))
		.then(info => callback(info))
		.catch(alert)
	}
}