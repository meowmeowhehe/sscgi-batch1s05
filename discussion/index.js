// [1] Separation of Concern
// [2] Minimum Viable Product (MVP)
// [3] Version Control System

// For JavaScript, best practice is external

console.log("Hi");

/*
  Functions
    - lines / blocks of codes that tell our device / application to perform a certain task when called / invoked
    - create complicated tasks to run several lines of code in succession
    - function declarations:
      -- function statement
          - defines function with specified parameters
          - syntax: function <functionName>() { <code block> }
          - syntax: function <functionName>(<parameter/s>) { <code block> }
  
  Semicolons
    - used to separate executable JS statements
*/

function printName() {
  console.log("My name is Jeff.");
}

printName(); // invoke / called
/*
  Function Invocation
    - code block & statements inside function is not immediately executed when defined
    - is only executed when invoked / called
*/

/*
  Function Declaration
    - hoisting
    - function name
    - global / local
    - var

  Function Expression
    - not hoisted
    - anonymous
    - let / const
    - function can be stored in variable

  Hoisting
    - JS behavior for certain variables & functions to run / use them before declaration
*/

// Function Declaration
// Function Hoisting
greet();
function greet() {
  console.log("Hey!!");
}

// Variable Hoisting
console.log(sum); // undefined
var sum = 10;
console.log(sum); // 10

// Function Expression
let funcExpress = function () {
  console.log("funcExpress");
};
funcExpress();

/*
  Function Scoping
    - accessibility of variables within program
    - types of scope:
      - local scope
      - global scope
      - function scope
*/

{
  let localVar = "localVar";
  console.log(localVar);
}

let globalVar = "globalVar";
console.log(globalVar);

/*
  Function Scope
    - each function creates new scope
    - variables inside function are not accessible to outside even if var is used
*/

function showNames() {
  var funcVar = "funcVar";
  const funcConst = "funcConst";
  let funcLet = "funcLet";

  console.log(funcVar);
  console.log(funcConst);
  console.log(funcLet);
}
showNames();

/*
  Function: Parameters & Arguments
    - using variables as argument
*/
function printInput() {
  let nickName = prompt("Enter your nickname:");
  console.log("Hello,", nickName);
}
printInput();

function printName(name) {
  console.log("My name is", name);
}
printName("Lorenz");
printName("Jedd");

let sampleVariable = "sampleVariable";
printName(sampleVariable);
