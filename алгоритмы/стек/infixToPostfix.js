//Преобразование инфиксного выражения к постфиксному


function infixToPostfix(infix) {
	let opstack = new Stack();
	let result = [];
	infix = infix.split(' ');
	let priority = {
		'(': 0,
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
		'^': 3
	};
	
	
	for (let token of infix) {
		if (token.search(/\w/i) > -1) {
			result.push(token);
		} else if (token == '(') {
			opstack.push(token);
		} else if (token == ')') {
			while (opstack.peek() != '(') {
				result.push(opstack.pop());
			}
			opstack.pop();
		} else {
			while (priority[token] <= priority[opstack.peek()]) {
				result.push(opstack.pop());
			}
			opstack.push(token);
		}
	}
	
	while (!opstack.isEmpty()) {
		result.push(opstack.pop());
	}
	
	return result.join(' ');
}




//функция вычисления постфиксного выражения

function postfixEval(postfix) {
	let opstack = new Stack();
	postfix = postfix.split(' ');
	for (let token of postfix) {
		if (token.search(/\d/) > -1) {
			opstack.push(token);
		} else {
			let operand2 = opstack.pop();
			let operand1 = opstack.pop();
			opstack.push(doMath(operand1, operand2, token));
		}
	}
	return opstack.pop();
	
	
	function doMath(num1, num2, act) {
		num1 = Number(num1);
		num2 = Number(num2);
		if (act == '+') {
			return num1 + num2;
		} else if (act == '-') {
			return num1 - num2;
		} else if (act == '*') {
			return num1 * num2;
		} else {
			return num1 / num2;
		}
	}
	
}
