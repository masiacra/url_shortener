document.forms[0].onsubmit = () => {
	const xhr = new XMLHttpRequest();
	const longUrl = document.forms[0].longUrl.value;
	const body = JSON.stringify({ longUrl });
	document.forms[0].longUrl.value = '';
	xhr.open('POST', '/', true);
	xhr.setRequestHeader('Content-type', 
	'application/json; charset=utf-8');
	xhr.send(body);
	xhr.onload = () => { console.log(this.responseText) };
	xhr.onerror = () => { console.log(this.status) };
	return false;
};
