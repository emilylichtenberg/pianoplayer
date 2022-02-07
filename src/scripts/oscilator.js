const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
class Oscilator {
    constructor(key,note) {
        this.key = key //key
        this.osc = audioContext.createOscillator(); //osc
        this.gain = audioContext.createGain(); //gain
        this.volumeInput = document.querySelector("input[name=volume]") //HTML element of the volume slide
        // this.volumeInput.addEventListener('change',this.volumeChange.bind(this)); //if change volume element, update gain value?
                //event listener not working because of how we create new osc each time we play note, below sets gain value = to input at time of play
        
        this.gain.gain.value = this.volumeInput.value;
        this.osc.frequency.value = note.frequency //from Octavian
        // this.osc.type = 'triangle'


        this.osc.connect(this.gain);
        this.gain.connect(audioContext.destination);
    }

    start() {
        // this.volumeChange();
        this.osc.start();
        // console.log(this.key.id);
        // console.log(this.volume);
        // console.log(this.volumeInput.value);
        // console.log(this.gain);
    }
    
    stop() {
        this.key.classList.remove('active');
        this.osc.stop();
    }

    // volumeChange() {
    //     this.gain.gain.value = this.volumeInput.value;
    //     debugger
    // }
}

export default Oscilator;


