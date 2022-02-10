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
        
        this.metroSlider.value = 120;
        this.count = 0;

        this.highClick = new Audio('./dist/audio/high-click.mp3');
        this.lowClick = new Audio('./dist/audio/low-click.mp3');
            this.highClick.volume = .5;
            this.lowClick.volume = .3;

        this.addEvents()
    }

    addEvents() {
        this.decrMetro.addEventListener('click',this.decreaseMetro.bind(this));
        this.incrMetro.addEventListener('click',this.increaseMetro.bind(this));
        this.metroSlider.addEventListener('input',this.updateMetroValue.bind(this));
        this.decrTimeSig.addEventListener('click',this.decreaseTimeSig.bind(this));
        this.incrTimeSig.addEventListener('click',this.increaseTimeSig.bind(this));
        this.startMetro.addEventListener('click',this.handleStartMetro.bind(this));
    }

    decreaseMetro() {
        if (this.bpm > 50) {
            this.bpm -= 1;
            this.bpmEl.textContent = this.bpm;
            this.metroSlider.value = this.bpm;
        }
    }
    increaseMetro() {
        if (this.bpm < 300) {
            this.bpm += 1;  
            this.bpmEl.textContent = this.bpm;
            this.metroSlider.value = this.bpm;
        }
    }
    updateMetroValue() {
        if (this.bpm >= 50 || this.bpm <= 300) {
            this.bpm = parseInt(this.metroSlider.value);
            this.bpmEl.textContent = this.bpm;
            this.metroSlider.value = this.bpm;
            this.metroInterval = (1/(this.bpm/60))*1000
        }
    }

    decreaseTimeSig() {
        if (this.timeSig > 1) {
            this.timeSig -= 1;
            this.timeSigVal.textContent = this.timeSig;
            this.count = 0;
        }
    }
    increaseTimeSig() {
        if (this.timeSig < 8) {
            this.timeSig += 1;
            this.timeSigVal.textContent = this.timeSig;
            this.count = 0;
        }
    }

    handleStartMetro() {
        this.startMetro.classList.toggle('active');
        if (this.startMetro.classList.contains('active')) {
            this.startMetro.textContent = 'STOP';
            this.startMetronome();
        } else {
            this.startMetro.textContent = 'START';
            this.stopMetronome();
        }
    }

    startMetronome() {
        this.count = 0; // used to track each loop of the metronome to know which click sound to play
        this.metroInterval = (1/(this.bpm/60))*1000 // val to use in set timeout
        this.expectedTime = Date.now() + this.metroInterval;
        this.timeout = setTimeout(this.loopMetro.bind(this), this.metroInterval);
    }

    loopMetro() {
        this.playSound();
        let lag = Date.now() - this.expectedTime; // calculate lag between expected time and actual time
        this.expectedTime += this.metroInterval; 
        this.timeout = setTimeout(this.loopMetro.bind(this), this.metroInterval - lag); // use altered interval time based on previous lag
    }

    playSound() {
        if (this.count % this.timeSig === 0) {
            this.highClick.play();
        } else {
            this.lowClick.play();
        }
        this.count += 1
    }

    stopMetronome() {
        clearTimeout(this.timeout)
    }


}


export default Metronome;

