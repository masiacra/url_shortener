//Стек
class Stack {
	constructor() {
		this.items = [];
	}
	
	push(item) {
		if (!item && item != 0) {
			throw new Error("Не передано значение для добавления в стек");
		}
		this.items.push(item);
	}
	
	pop() {
		return this.items.pop();
	}
	
	//Возвращает верхний элемент стека
	peek() {
		return this.items[this.items.length - 1];
	}
	
	isEmpty() {
		return this.items.length == 0;
	}
	
	size() {
		return this.items.length;
	}
	
}


let stack = new Stack();
console.log(stack.size());

stack.push(4);
console.log(stack.isEmpty());

