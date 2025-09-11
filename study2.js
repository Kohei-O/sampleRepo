a = 2;
try{
    if (a === 2) {
        throw new Error("aは2です");
        a = 3;
    }
} catch (error) {
    console.error(error);
}
console.log(a);
console.log(function(){console.log("関数が実行されました")}());