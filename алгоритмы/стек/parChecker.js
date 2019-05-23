function parChecker(parentheses) {
	let stack = new Stack();
	let i = 0;
	let found = true;
	
	while (i < parentheses.length && found) {
		if (parentheses[i] === '(') {
			stack.push(parentheses[i]);
			i++;
		} else {
			if (!stack.isEmpty()) {
				stack.pop();
				i++
			} else {
				found = false;
			}
		}
	}
	if (!stack.isEmpty()) {
		found = false;
	}
	return found;
}
