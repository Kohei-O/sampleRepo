function myFunc({a = 1, b = 2, c} = {}) {
    console.log(a+b);
}
myFunc();

try{
    throw new Error('Error occurred');
}catch(e){
    console.trace(e);
}

console.log('End of script');


g = ["1" ,2]
console.log(Array.isArray(g[0]))