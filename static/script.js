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
				console.log(this.responseText);
				if (elem.classList.contains('alert')) {
					elem.classList.remove('alert');
				}
				inp.value = '';
				let evt = new CustomEvent('success', {
					bubbles: true,
					detail: longUrl
				});
				elem.dispatchEvent(evt);
			} else {
				if (!elem.classList.contains('alert')) {
					elem.classList.add('alert');
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
	}
	publish(data) {
		this.elem.innerHTML = data;
	}
}(document.body.getElementsByClassName('result')[0]);

document.body.addEventListener('success', (evt) => {
	record.publish(evt.detail);
});
document.body.addEventListener('problems', (evt) => {
	record.publish(evt.detail);
});
