const form = new class {
	constructor(elem) {
		this.elem = elem;
		this.elem.onsubmit = () => { 
			return false; 
		};
		this.elem.onclick = this._onClick.bind(this);
	}
	
	_onClick(event) {
		const target = event.target;
		if (target.tagName != 'BUTTON') {
			return; 
		}
		const elem = this.elem;
		const inp = elem.longUrl;
		const xhr = new XMLHttpRequest();
		const longUrl = inp.value;
		if (this.elem.classList.contains('alert')) {
			this.elem.classList.remove('alert');
		}
		
		xhr.open('POST', '/', true);
		xhr.setRequestHeader('Content-type', 
		'application/json; charset=utf-8');
		xhr.send(JSON.stringify({ longUrl }));
		xhr.onload = function(){ 
			if (this.status === 200) {
				const warningSyst = elem.getElementsByClassName('warning')[0];
				if (!warningSyst.classList.contains('hidden')) {
					warningSyst.classList.add('hidden');
				}
				console.log(this.responseText);
				inp.value = '';
				const data = JSON.parse(this.responseText);
				let evt = new CustomEvent('success', {
					bubbles: true,
					detail: data
				});
				elem.dispatchEvent(evt);
			} else {
				const warningSyst = elem.getElementsByClassName('warning')[0];
				if (warningSyst.classList.contains('hidden')) {
					warningSyst.classList.remove('hidden');
				}
			}
		};
		xhr.onerror = function() { 
			console.log(this.status);
			let evt = new CustomEvent('problems', {
				bubbles: true,
				detail: 'Sorry, we have some probles'
			});
			elem.dispatchEvent(evt); 
		};		
	}

	
	
	
}(document.forms[0]);


const record = new class {
	constructor(elem) {
		this.elem = elem;
		this.elem.onclick = this._onClick.bind(this);
	}
	publish(data) {
		this.elem.classList.add('result');
		if (typeof data === 'object') {
			this.elem.innerHTML = `<div>${data.longUrl}</div> 
			<div><a href="http://localhost:5000/${data.shortUrl}"
			target="_blank" id="shortUrl">
			http://localhost:5000/${data.shortUrl}</a></div>
			<div><button class="button">copy</button></div>`;
		} else {
			this.elem.innerHTML = data;
		}

	}
	
	_onClick(event) {
		const target = event.target;
		if (target.tagName !== 'BUTTON') {
			return;
		}
		const shortUrl = document.getElementById('shortUrl');
		const range = document.createRange();
		range.selectNode(shortUrl);
		window.getSelection().addRange(range);
		try {
			const successful = document.execCommand('copy');
			if (successful) {
				target.innerHTML = 'Copied!';
			} else {
				console.log("The command was unsiccessful");
			}	
		} catch(e) {
				console.log(e);
		}
			
		window.getSelection().removeAllRanges(); 
	}
	
}(document.body.getElementsByClassName('record')[0]);

document.body.addEventListener('success', (evt) => {
	record.publish(evt.detail);
});
document.body.addEventListener('problems', (evt) => {
	record.publish(evt.detail);
});
