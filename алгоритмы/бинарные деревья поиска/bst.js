const util = require('util');

//класс узел

class TreeNode {
	constructor({key, payload, leftChild=null, rightChild=null, parent=null}) {
		this.key = key;
		this.payload = payload;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
		this.parent = parent;
	}
	
	hasLeftChild() {
		return this.leftChild;
	}
	
	hasRightChild() {
		return this.rightChild;
	}
	
	isLeftChild() {
		return this.parent && this.parent.leftChild === this;
	}
	isRightChild() {
		return this.parent && this.parent.rigthChild === this;
	}
	
	isRoot() {
		return !this.parent;
	}
	
	isLeaf() {
		return !(this.leftChild || this.rightChild);
	}
	
	hasAnyChildren() {
		return this.leftChild || this.rightChild;
	}
	
	hasBothChildren() {
		return this.leftChild && this.rightChild;
	}
	
	replaceNodeData(key, val, lc, rc) {
		this.key = key;
		this.payload = val;
		this.leftChild = lc;
		this.rightChild = rc;
		if (this.leftChild) {
			this.leftChild.parent = this;
		}
		if (this.rightChild) {
			this.rightChild.parent = this;
		}
	}
	
}

//Дерево бинарного поиска
 class BinarySearchTree {
	constructor() {
		this.root = null;
		this.size = 0;
	}
	
	len() {
		return this.size;
	}
	
	put(key, val) {
		if (this.root) {
			this._put(key, val, this.root);
		} else {
			this.root = new TreeNode({key: key, val: val});
		}
		this.size++;
	}
	
	_put(key, val, currentNode) {
		if (currentNode.key > key) {
			if (currentNode.hasLeftChild()) {
				this._put(key, val, currentNode.leftChild);
			} else {
				currentNode.leftChild = new TreeNode({key: key, 
					payload: val, parent: currentNode});
			}
		} else if (currentNode.key === key) {
			currentNode.payload = val;
		} else {
			if (currentNode.hasRightChild()) {
				this._put(key, val, currentNode.rightChild);
			} else {
				currentNode.rightChild = new TreeNode({key: key, 
					payload: val, parent: currentNode});
			}
		}
	}
	
	get(key) {
		if (this.root) {
			let res = this._get(key, this.root);
			if (res) {
				return res.payload;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	_get(key, currentNode) {
		if (!currentNode) {
			return null;
		} else if (currentNode.key > key) {
			if (currentNode.hasLeftChild()) {
				return this._get(key, currentNode.leftChild);
			} else {
				return null;
			}
		} else if (currentNode.key === key) {
			return currentNode;
		} else {
			if (currentNode.hasRightChild()) {
				return this._get(key, currentNode.rightChild);
			} else {
				return null;
			}
		}
		
	}
	
	contains(key) {
		if (this._get(key, this.root)) {
			return true;
		} else {
			return false;
		}
	}
	
 }
 
 let bst = new BinarySearchTree();
 bst.put(5);
 bst.put(30);
bst.put(2);
bst.put(40);
bst.put(25);
bst.put(4);
bst.put(30, 'sosite');
console.log(util.inspect(bst, 4));
console.log(bst.root.leftChild);
console.log(bst.contains(30));
console.log(bst.contains(12));
