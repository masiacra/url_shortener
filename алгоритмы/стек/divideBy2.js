function divideBy2(num) {
	let stack = new Stack();
	let result = '';
	while (num > 0) {
		let rem = num % 2;
		stack.push(rem);
		num = Math.floor(num / 2);
	}
	
	while (!stack.isEmpty()) {
		result += stack.pop();
	}
	return Number(result);
}

function baseConverter(num, base) {
	let digits = '0123456789ABCDEF';
	let stack = new Stack();
	let result = '';
	while (num > 0) {
		stack.push(num % base);
		num = Math.floor(num / base);
	}
	while (!stack.isEmpty()) {
		result += digits[stack.pop()];
	}
	return result;
}


console.log(divideBy2(17));
