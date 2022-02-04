const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const audioElement = document.querySelector('audio');
const playButton = document.getElementById('play-pause');
const volumeRange = document.getElementById('volume');

playButton.addEventListener('click', "DO PLAY CODE HERE")
volumeRange.addEventListener('input')