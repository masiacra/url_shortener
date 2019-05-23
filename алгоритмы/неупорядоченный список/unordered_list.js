class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
	
	getData() {
		return this.data;
	}
	
	setData(newdata) {
		this.data = newdata;
	}
	
	setNext(newnext) {
		this.next = newnext;
	}
	
	getNext() {
		return this.next;
	}
	
}


class UnorderedList {
	constructor() {
		this.head = null;
	}
	
	isEmpty() {
		return this.head === null;
	}
	
	add(item) {
		let temp = new Node(item);
		temp.setNext(this.head);
		this.head = temp;
	}
	
	size() {
		let count = 0;
		let current = this.head;
		while (current) {
			count++;
			current = current.getNext();
		}
		return count;
	}
	
	search(item) {
		let found = false;
		let current = this.head;
		while (!found && current) {
			if (current.getData() === item) {
				found = true;
			} else {
				current = current.getNext();
			}
		}
		return found;
	}
	
	remove(item) {
		let found = false;
		let current = this.head;
		let prev = null;
		while (!found) {
			if (current.getData() === item) {
				found = true;
			} else {
				prev = current;
				current = current.getNext();
			}
		}
		if (!prev) {
			this.head = current.getNext();
		} else {
			prev.setNext(current.getNext());
		}
		
	}
	
	append(item) {
		let temp = new Node(item);
		let current = this.head;
		while (current.getNext()) {
			current = current.getNext();
		}
		current.setNext(temp);
	}
	
	index(item) {
		let ind = 0;
		let found = false;
		let current = this.head;
		while (!found) {
			if (current.getData() === item) {
				found = true;
			} else {
				ind++;
				current = current.getNext();
			}
		}
		return ind;
	}
	
	pop(pos) {
		if (!pos && pos !== 0) {
			pos = this.size() - 1;
		}
		let current = this.head;
		let prev = null;
		let ind = 0;
		while (pos != ind) {
			prev = current;
			current = current.getNext();
			ind++;
		} 
		if (!prev) {
			this.head = null;
		} else {
			prev.setNext(current.getNext());
		}
	}
	
}
