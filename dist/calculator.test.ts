var calculator = require('./calculator');
var x = 10;
var y = 5;
test('Add numbers using the add method', () => {
     expect(calculator.add(x, y)).toBe(15)
});
test('Subtract numbers using the subtract method', () => {
     expect(calculator.subtract(x, y)).toBe(5)
});
test('Multiply numbers using the multiply method', () => {
     expect(calculator.multiply(x, y)).toBe(50)
});
test('Divide numbers using the divide method', () => {
     expect(calculator.divide(x, y)).toBe(2)
});
test('Find the remainder of dividing numbers using the modulo method', () => {
     expect(calculator.modulo(x, y)).toBe(0)
});