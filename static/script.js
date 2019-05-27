const form = new class {
	constructor(elem) {
		this.elem = elem;
		this.elem.onsubmit = () => { 
			return false; 
		};
		this.elem.onclick = this._onClick.bind(this);
	}
	
	_onClick() {
		const xhr = new XMLHttpRequest();
		const inp = this.elem.longUrl;
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
				if (inp.classList.contains('alert')) {
					inp.classList.remove('alert');
				}
				inp.value = '';
			} else {
				if (!inp.classList.contains('alert')) {
					inp.classList.add('alert');
				}
			}
		};
		xhr.onerror = function() { 
			console.log(this.status) 
		};		
	}
	
	
	
}(document.forms[0]);



