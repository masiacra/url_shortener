function hot_potato(list, num) {
	let q = new Queue();
	for (let name of list) {
		q.enqueue(name);
	}
	while (q.size() > 1) {
		for (let i = 0; i < num; i++) {
			q.enqueue(q.dequeue());
		}
		q.dequeue();
	}
	return q.dequeue();
}
