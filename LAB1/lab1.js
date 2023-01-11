
//a+b-
let mySum = require("./modules/sumFunction")


console.log("This is the sum: "+mySum(1,5,56,123));

//c-
let myArr =[12,574,89,2,54,2,30]

//d-
console.log("This is the sum of the array: "+ mySum(...myArr));

//e-
let myArr2=[];
myArr.map((n)=>{
    myArr2.push(n*2)
})
console.log("Array 2:");
console.log(myArr2);

//F-

let avrg=((mySum(...myArr2))/myArr2.length)

let filteredArray2=myArr2.filter(n=> n>avrg);
console.log("Filtered Array 2: ["+filteredArray2+"]");

//G-

function timeMessage (){
    console.log("Goodbye!");
}

setTimeout(timeMessage,3000);

//H

let employee ={
    empname:"Tadeu",
    email:"gmail.com",
    department:"DevOps",
    startDate:"01/04/2023"
}

//I
let {empname,email}=employee;
const person={empname,email}
console.log(person);