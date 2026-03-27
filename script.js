const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const volumeSlider = document.getElementById('volume-slider');

// 1. Song List (Replace these with your actual local file names)
const songs = ['Music_Track_1', 'Music_Track_2', 'Music_Track_3'];
let songIndex = 0;

// 2. Load the initial song
function loadSong(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`; // Ensure files are named exactly like the array
}

// 3. Play/Pause Function
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = 'Pause';
    } else {
        audio.pause();
        playBtn.innerText = 'Play';
    }
}

// 4. Update Progress Bar as song plays
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// 5. Click on progress bar to skip
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// 6. Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// 7. Navigation
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = 'Pause';
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.innerText = 'Pause';
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// Initialize
loadSong(songs[songIndex]);