let Deque = require("./Deque.js");
function palchecker(word) {
	let d = new Deque();
	for (let symb of word) {
		d.addFront(symb);
	}
	
	let stillPal = true;
	
	while (d.size() > 1 && stillPal) {
		let symb1 = d.removeRear();
		let symb2 = d.removeFront();
		if (symb1 != symb2) {
			stillPal = false;
		}
	}
	return stillPal;
	
}


console.log(palchecker('radar'), true);

console.log(palchecker('abcd'), false);

