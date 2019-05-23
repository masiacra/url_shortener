//класс очередь

class Queue {
	constructor() {
		this.items = [];
	}
	
	isEmpty() {
		return this.items.length === 0;
	}
	
	size() {
		return this.items.length;
	}
	
	//Добавление элемента в очередь
	
	enqueue(item) {
		this.items.unshift(item);
	}
	
	dequeue() {
		return this.items.pop();
	}
	
	
	
}


