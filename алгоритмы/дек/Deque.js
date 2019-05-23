//Дек

class Deque {
	constructor() {
		this.items = [];
	}
	
	addRear(item) {
		this.items.unshift(item);
	}
	
	addFront(item) {
		this.items.push(item);
	}
	
	removeFront() {
		return this.items.pop();
	}
	
	removeRear() {
		return this.items.shift();
	}
	
	size() {
		return this.items.length;
	}
	
	isEmpty() {
		return this.items.length === 0;
	}
	
}


