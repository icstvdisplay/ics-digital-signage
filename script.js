const image=document.getElementById("imagePlayer");
const video=document.getElementById("videoPlayer");

const runningText=document.getElementById("runningText");

runningText.innerHTML="Welcome to Indonesian Creative School";

function updateClock(){

const now=new Date();

document.getElementById("clock").innerHTML=
now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

image.style.display="block";

image.src="https://picsum.photos/1920/1080";
