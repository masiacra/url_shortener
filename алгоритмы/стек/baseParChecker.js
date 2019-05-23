//Проверка на пар скобок на сбалансированность
function baseParChecker(pars) {
	pars = pars.match(/[\(\)\[\]\{\}]/g);
	if (!pars) return false;
	let i = 0;
	let found = true;
	let availability = ['(', '[', '{'];
	let stack = new Stack();
	
	while (i < pars.length && found) {
		if (availability.indexOf(pars[i]) > -1) {
			stack.push(pars[i]);
			i++;
		} else {
			if (stack.isEmpty()) {
				found = false;
			} else {
				if (matchers(stack.peek(), pars[i])) {
					stack.pop();
					i++;
				} else {
					found = false;
				}
			}
		}
	}
	
	if (!stack.isEmpty()) {
		found = false;
	}
	
	return found;
	
	function matchers(symb1, symb2) {
		if (symb1 == '(' && symb2 ==')') return true;
		if (symb1 == '[' && symb2 == ']') return true;
		if (symb1 == '{' && symb2 == '}') return true;
		return false;
	}
	
}


