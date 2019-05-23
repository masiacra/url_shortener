//дерево списков

function BinaryTree(r) {
	return [r, [], []];
}


function insertLeft(root, newBranch) {
	let t = root.splice(1, 1);
	if (t.length == 0) {
		root.splice(1, 0, [newBranch, [], []]);
	} else {
		root.splice(1, 0, [newBranch, t, []]);
	}
	return root;
}


function insertRight(root, newBranch) {
	let t = root.splice(2, 1);
	if (t.length == 0) {
		root.splice(2, 0, [newBranch, [], []]);
	} else {
		root.splice(2, 0, [newBranch, [], t]);
	}
	return root;
}


function getRootVal(root) {
	return root[0];
}

function getLeftChild(root) {
	return root[1];
}

function getRightChild(root) {
	return root[2];
}

function setRootVal(root, newVal) {
	root[0] = newVal;
}


