// Variables initialization
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay'); 
let Myprogressbar = document.getElementById('Myprogressbar'); 
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "(Light feat. Dualistic)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" }, 
    { songName: "Lost VIANI, Andrew A", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Try Again Goodknight", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Consume Me CITYWLKR", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Vision iFeature, just alex", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Tension EXXO", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "For You (feat. Eline Mann)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
];

// Set song items (thumbnails and names)
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Myprogressbar.value = progress;
});

// Seek functionality
Myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = Myprogressbar.value * audioElement.duration / 100;
});

// Function to reset all play icons to 'fa-play'
function makeALLPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

// Play specific song when its play button is clicked
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeALLPlays();
        songIndex = index;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    });
});
