const prompt = require('prompt-sync')();

let x = prompt("Enter the first number: ");
let y = prompt("Enter the second number: ");
let gcf;

if (x > y) {
    for(let i = 1; i <= y; i++) {
        if(x % i == 0 && y % i == 0){
            gcf = i;
        }
    }
}
else {
    for (i = 1; i <= x; i++){
        if (x % i == 0 && y % i == 0) {
            gcf = i;
        }
    }
}

console.log("The GCF is: " + gcf);
