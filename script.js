const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const volumeSlider = document.getElementById('volume-slider');

// Updated to match your EXACT filenames from the screenshot
const songs = ['Music_Track_1', 'Music_Track_2', 'Music_Track_3'];
let songIndex = 0;

// Load song details
function loadSong(song) {
    // This removes the underscores for a cleaner title display (e.g. "Music Track 1")
    title.innerText = song.replace(/_/g, ' '); 
    audio.src = `${song}.mp3`; 
}

// Play/Pause logic
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = 'Pause';
    } else {
        audio.pause();
        playBtn.innerText = 'Play';
    }
}

// Update Progress Bar
audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
});

// Click on progress bar to skip
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Next Song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = 'Pause';
}

// Previous Song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = 'Pause';
}

// Automatically play next song when current one ends
audio.addEventListener('ended', nextSong);

// Event Listeners
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Initial Load
loadSong(songs[songIndex]);
