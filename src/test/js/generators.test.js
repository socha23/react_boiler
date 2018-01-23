
function *oneToThree() {
	yield 1;
	yield 2;
	yield 3;
}


test('one two', () => {
	let iterator = oneToThree();

    expect(iterator.next()).toEqual({done: false, value: 1})
	expect(iterator.next()).toEqual({done: false, value: 2})
    expect(iterator.next()).toEqual({done: false, value: 3})	
	expect(iterator.next()).toEqual({done: true, value: undefined})	
});
