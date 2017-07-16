a = [3, 1, 2];
console.log(a);

a.sort((a, b) => {
    return b - a;
});

//call back function: 누군가에게 나중에(back) 호출(call) 당할 함수(function).
console.log(a)