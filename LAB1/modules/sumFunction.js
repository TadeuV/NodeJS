
let mySum = (...num) => {
    let res=0;

    num.forEach(function(number){

        res+=number;
    });
    return res;
}

module.exports=mySum;