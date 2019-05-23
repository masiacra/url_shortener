//Функция, изменяющая порядок в строке на противоположный
function revstring(str) {
	if (typeof str != 'string') {
		throw new Error("Переданные данные не являются строкой");
	}
	let stack = new Stack();
	let result = '';
	for (let i of str) {
		stack.push(i);
	}
	while (!stack.isEmpty()) {
		result += stack.pop();
	}
	return result;
}
