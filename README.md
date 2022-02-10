# Music Player

Link to live site: https://emilylichtenberg.github.io/pianoplayer/

## Background and Description
I started playing piano when I was five years old so for my Javascript project I will be creating an interactive online keyboard.  The webpage will contain two octaves of a piano and different ways with which to interact.  See below for additional details.

## Technologies
In addition to Javascript, HTML and CSS, this project uses:
* Howler: an audio library that creates an easy way to play and manipulate large audio files.  
* Tonal: used minimally in the project but has built in methods to create chords, scales and progressions based on user input.

## Feature Highlight
* Metronome: created to keep precise timing with specified bpm and time signature
    - Initially the metronome was set up with a setInterval function but I was noticing a lag between expected tick time and actual tick time.  To correct this I adjusted the interval time for each loop to subtract the previous lag.  Each individual loop can vary from 2-7 ms but the lag resets and remains fairly precise over time. Code below:

```javascript
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
```

* Instrument Variety: By using Howler to handle large audio files, I was able to load similarly structured files for different instruments and based on user input play the snippet from the correct file.
```javascript
    // Two examples of creating the howl
    this.pianoHowl = new Howl({
        src: ['./dist/audio/piano-tones.mp3'],
        html5: true,
        buffer: true,
        onload() {
            console.log('sound file loaded');
        },
        onloaderror(error,message) {
            console.log('Error:', {error, message})
        }
    });

    this.stringHowl = new Howl({
        src: ['./dist/audio/string.mp3'],
        html5: true,
        buffer: true,
        onload() {
            console.log('sound file loaded');
        },
        onloaderror(error,message) {
            console.log('Error:', {error, message})
        }
    });

    // Selecting the correct howl to use in playback
    if (this.soundSelector.value === 'piano') {
        this.soundHowl = this.pianoHowl;
    } else if(this.soundSelector.value === 'string') {
        this.soundHowl = this.stringHowl;
    } else if (this.soundSelector.value === 'guitar') {
        this.soundHowl = this.guitarHowl;
    } else if (this.soundSelector.value === 'flute') {
        this.soundHowl = this.fluteHowl;
    }
```

## Next Steps
* Create a record and playback feature
* Add the ability to adjust starting octave
* Utilize Tonal to have preselected chords and scales available to play

## Bug Log
* When creating the Howl I needed to add `html5: true` which allowed the audio to begin playing before it was fully downloaded/decorded
* Calling .value on the metronome slider returns a string so trying to increase the BPM after would append a 1 to the value instead of incrementing.  Using parseInt solved the issue.