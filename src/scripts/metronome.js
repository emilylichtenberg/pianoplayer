import { note, interval, transpose } from '@tonaljs/tonal';
import {chord} from '@tonaljs/chord';

let metroInterval;
class Metronome {
    
    constructor() {
        this.bpmEl = document.querySelector('.bpm-val');
        this.bpm = 120;
        this.decrMetro = document.querySelector('.decr-metro');
        this.incrMetro = document.querySelector('.incr-metro');
        this.metroSlider = document.querySelector('#metronome');
        this.decrTimeSig = document.querySelector('.decr-timeSig');
        this.incrTimeSig = document.querySelector('.incr-timeSig');
        this.timeSigVal = document.querySelector('.timeSig-val');
        this.timeSig = 4;
        this.startMetro = document.querySelector('.startMetro')

        this.loudClick = new Audio('./src/audio/loud-click.wav');
        this.softClick = new Audio('./src/audio/soft-click.wav');

        this.addEvents()
    }
    
    addEvents() {
        this.decrMetro.addEventListener('click',this.decreaseMetro.bind(this));
        this.incrMetro.addEventListener('click', this.increaseMetro.bind(this));
        this.metroSlider.addEventListener('input',this.updateMetroValue.bind(this));
        this.decrTimeSig.addEventListener('click',this.decreaseTimeSig.bind(this));
        this.incrTimeSig.addEventListener('click',this.increaseTimeSig.bind(this));
        this.startMetro.addEventListener('click',this.handleStartMetro.bind(this));
    }

    decreaseMetro() {
        if (this.bpm > 50) {
            this.bpm -= 1;
            this.bpmEl.innerHTML = this.bpm;
            this.metroSlider.value = this.bpm;
            // debugger
        }
    }
    increaseMetro() {
        if (this.bpm < 300) {
            this.bpm += 1;
            this.bpmEl.innerHTML = this.bpm;
            this.metroSlider.value = this.bpm;
            // debugger
        }
    }
    updateMetroValue() {
        this.bpm = this.metroSlider.value;
        if (this.bpm < 50 || this.bpm > 300) return;
        this.bpmEl.innerHTML = this.bpm;
        this.metroSlider.value = this.bpm;
        // debugger
        // console.log(this.bpm);
        // console.log(this.metroSlider);
        // console.log(this.metroSlider.value);
    }

    decreaseTimeSig() {
        if (this.timeSig > 2) {
            this.timeSig -= 1;
            this.timeSigVal.innerHTML = this.timeSig;
        }
    }
    increaseTimeSig() {
        if (this.timeSig < 8) {
            this.timeSig += 1;
            this.timeSigVal.innerHTML = this.timeSig;
        }
    }

    handleStartMetro() {
        console.log('working')
        this.startMetro.classList.toggle('active');
        // debugger
        if (this.startMetro.classList.contains('active')) {
            this.startMetro.innerHTML = 'STOP';
            this.startMetronome();
        } else {
            this.startMetro.innerHTML = 'START';
            this.stopMetronome();
        }
    }

    startMetronome() {
        const that=this;
        let intervalTime = (1/(this.bpm/60))*1000;
        metroInterval = setInterval(() => {
            that.loudClick.play();
        }, intervalTime)
    }

    stopMetronome() {
        clearInterval(metroInterval)
    }

}


export default Metronome;