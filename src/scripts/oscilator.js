

// const audioElement = document.querySelector('audio');
// const playButton = document.getElementById('play-pause');
// const volumeRange = document.getElementById('volume');

// playButton.addEventListener('click', "DO PLAY CODE HERE")
// volumeRange.addEventListener('input')


// osc.setPeriodicWave(wave);
// osc.type = 'sine';
// osc.type = 'triangle';
// osc.frequency.value = 440; //a4?


//adjusting volume
// let volume = {};
// volume.gainNode = null;
// volume.play = function() {

// }
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
class Oscilator {
    constructor(key,note) {
        this.key = key
        this.osc = audioContext.createOscillator();
        this.gain = audioContext.createGain();
        // this.volume = gain.gain;
        this.volumes = document.querySelector("input[name=volume]")
   
        this.osc.frequency.value = note.frequency
        this.osc.connect(this.gain);
        this.gain.connect(audioContext.destination);
    }

    start() {
        this.osc.start();
        console.log(this.key.id);
    }
    
    stop() {
        this.key.classList.remove('active');
        this.osc.stop();
    }

    volumeChange() {
        this.volumes.addEventListener('change',() => )
    }
}

export default Oscilator;


