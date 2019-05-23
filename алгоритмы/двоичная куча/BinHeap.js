//двоичная куча

class BinHeap {
	constructor() {
		this.heapList = [0];
		this.currentSize = 0;
	}
	
	percUp(i) {
		while (Math.floor(i / 2) > 0) {
			if (this.heapList[Math.floor(i / 2)] > this.heapList[i]) {
				[this.heapList[i], this.heapList[Math.floor(i / 2)]] =
					[this.heapList[Math.floor(i / 2)], this.heapList[i]];
			}
			i = Math.floor( i / 2);
		}
	}
	
	insertList(k) {
		this.heapList.push(k);
		this.currentSize++;
		this.percUp(this.currentSize);
	}
	
	percDown(i) {
		while ( i * 2 <= this.currentSize) {
			let mc = this.minChild(i);
			if (this.heapList[i] > this.heapList[mc]) {
				[this.heapList[i], this.heapList[mc]] = 
					[this.heapList[mc], this.heapList[i]];
			}
			i = mc;
		}
	}
	
	minChild(i) {
		if (2 * i + 1 > this.currentSize) {
			return 2 * i;
		} else {
			if (this.heapList[2 * i] < this.heapList[2*i+1]) {
				return 2 * i;
			} else {
				return 2 * i + 1;
			}
		}
	}
	
	delMin() {
		let retVal = this.heapList[1];
		this.heapList[1] = this.heapList.pop();
		this.currentSize--;
		this.percDown(1);
		return retVal;
	}
	
	buildHeap(alist) {
		let i = Math.floor(alist.length / 2);
		this.currentSize = alist.length;
		this.heapList = [0].concat(alist);
		while (i > 0) {
			this.percDown(i);
			i--;
		}
	}
	
}

let heap = new BinHeap();
heap.buildHeap([9, 5, 6, 2, 3]);

console.log(heap.heapList);
