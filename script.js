const image = document.getElementById("imagePlayer");
const video = document.getElementById("videoPlayer");

const runningText = document.getElementById("runningText");
runningText.innerHTML =
"Welcome to Indonesian Creative School";

function updateClock(){
    document.getElementById("clock").innerHTML =
    new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();

let playlist=[];
let index=0;

async function loadPlaylist(){

    const res=await fetch("data/playlist.json");

    playlist=await res.json();

    playItem();

}

function playItem(){

    if(index>=playlist.length)
        index=0;

    const item=playlist[index];

    image.style.display="none";
    video.style.display="none";

    if(item.type==="image"){

        image.src=item.src;
        image.style.display="block";

        setTimeout(()=>{
            index++;
            playItem();
        },item.duration*1000);

    }else{

        video.src=item.src;
        video.style.display="block";

        video.play();

        video.onended=()=>{

            index++;
            playItem();

        };

    }

}

loadPlaylist();
