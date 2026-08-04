function clock(){

let now = new Date();


let h = now.getHours();
let m = now.getMinutes();
let s = now.getSeconds();


document.getElementById("clock").innerHTML =

h.toString().padStart(2,"0")
+ ":" +
m.toString().padStart(2,"0")
+ ":" +
s.toString().padStart(2,"0");


}


setInterval(clock,1000);

clock();
