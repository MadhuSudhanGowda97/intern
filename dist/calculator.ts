function add(a:any , b:any):number{
    return a + b;
}
function subtract(a:any , b:any):number {
    return a - b;
}
function multiply(a:any , b:any):number {
    return a * b;
}
function divide(a:any , b:any):number {
    return a / b;
}
function modulo(a:any , b:any):number {
    return a % b;
}
module.exports.add = add;
module.exports.subtract = subtract;
module.exports.multiply = multiply;
module.exports.divide = divide;
module.exports.modulo = modulo;