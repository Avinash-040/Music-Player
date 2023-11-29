console.log("Welcome to MusiWorld");
let songindex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname');

let songs=[
    {songname:"Yeh Vaada Raha", filePath:"song/1.mp3",coverPath:"covers/1.jpg"},
    {songname:"Mere Mehboob Qayamat Hogi", filePath:"song/2.mp3",coverPath:"covers/1.jpg"},
    {songname:"Kya Hua Tera Vada", filePath:"song/3.mp3",coverPath:"covers/1.jpg"},
    {songname:"Mere Samne Wali Khidki Mein", filePath:"song/4.mp3",coverPath:"covers/1.jpg"},
    {songname:"Gulabi Ankhen", filePath:"song/5.mp3",coverPath:"covers/1.jpg"},
    {songname:"O Mere Dil Ke Chain", filePath:"song/6.mp3",coverPath:"covers/1.jpg"},
    {songname:"Lag Ja Gale", filePath:"song/7.mp3",coverPath:"covers/1.jpg"},
]


//audioElement.play();

//handle pause and play
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //Update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressbar.value * audioElement.duration/100;  
})

const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllplays();
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songindex}.mp3`;
        mastersongname.innerText=songs[songindex-1].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>6){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<0){
        songindex=6;
    }
    else{
        songindex-=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})