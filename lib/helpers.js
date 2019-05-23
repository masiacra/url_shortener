


//Container for all methods
const helpers = {};


//Method cut
helpers.cut = () => {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let result = '';
	let symb1 = helpers.cut.counters.count1 + '';
	if (symb1.length < 4) {
		symb1 = '0'.repeat(4 - symb1.length) + symb1;
	} 
	const symb2 = alphabet[helpers.cut.counters.count2];
	const symb3 = alphabet[helpers.cut.counters.count3];
	const symb4 = alphabet[helpers.cut.counters.count4];
	helpers.cut.counters.count1++;
	if (helpers.cut.counters.count1 > 9999) {
		helpers.cut.counters.count1 = 0;
		helpers.cut.counters.count2++;
		if (helpers.cut.counters.count2 > 25) {
			helpers.cut.counters.count2 = 0;
			helpers.cut.counters.count3++;
			if (helpers.cut.counters.count3 > 25) {
				helpers.cut.counters.count3 = 0;
				helpers.cut.counters.count4++;
			}
		}
	}
	return symb4 + symb3 + symb2 + symb1;
};

helpers.cut.counters = {
	count1: 3,
	count2: 0,
	count3: 0,
	count4: 0
};



module.exports = helpers;
