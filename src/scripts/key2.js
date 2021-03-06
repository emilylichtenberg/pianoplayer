import {Howler, Howl} from 'howler'; 
import {note} from '@tonaljs/tonal';


const keyboardMap = ['q','2','w','3','e','r','5','t','6','y','7','u','i','9','o','0','p','z','s','x','d','c','f','v','b','h','n','j','m',',','l','.',';','/',"'",""];

class Key {
    constructor() {
        
        this.soundSelector = document.querySelector('#sound-options');
        // this.startOctave = document.querySelector('#octave-selection')
        
        this.createKeys();
        this.addEventListeners();
        
        this.volumeInput = document.querySelector("input[name=volume]")

        this.pianoHowl = new Howl({
            src: ['./dist/audio/piano-tones.mp3'],
            html5: true,
            buffer: true,
            onload() {
                // console.log('sound file loaded');
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
                // console.log('sound file loaded');
            },
            onloaderror(error,message) {
                console.log('Error:', {error, message})
            }
        });

        this.guitarHowl = new Howl({
            src: ['./dist/audio/finalguitar.mp3'],
            html5: true,
            buffer: true,
            onload() {
                // console.log('sound file loaded');
            },
            onloaderror(error,message) {
                console.log('Error:', {error, message})
            }
        });

        this.fluteHowl = new Howl({
            src: ['./dist/audio/flute.mp3'],
            html5: true,
            buffer: true,
            onload() {
                // console.log('sound file loaded');
            },
            onloaderror(error,message) {
                console.log('Error:', {error, message})
            }
        });


    }
    
    createKeys() {
        
        let piano = document.querySelector(".piano")

        // while (piano.firstChild) {
        //     piano.removeChild(piano.firstChild);
        // }

        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const keyColors = ["W","B","W","B","W","W","B","W","B","W","B","W"];
        // let startingOctave = parseInt(this.startOctave.value)
        // let octave = [];
        // for (let i = startingOctave; i <= startingOctave + 2; i++) {
        //     octave.push(i);
        // }
        const octave = [2,3,4];
        // const octave = [1,2,3]
        for (let i = 0; i < octave.length; i++) {
            for (let j = 0; j < notes.length ; j++) {
                let key = document.createElement("div");
                key.setAttribute('id',`${notes[j%notes.length]}${octave[i]}`);
                key.classList.add(`${keyColors[j%keyColors.length]}`);
                piano.append(key);  
            }
        }
        // this.resetEventListeners();
    }
    

    addEventListeners() {
        const allKeys = Array.from(document.querySelector(".piano").children);
        // const startingOctave = document.querySelector('#octave-selection')


        allKeys.forEach((key,i) => {
            key.innerHTML = keyboardMap[i];
            key.addEventListener('mousedown', (e) => {
                this.playNote(key);
            });
            key.addEventListener('mouseup',(e) => {
                this.stopNote(key);
            })
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            // debugger
            if (!keyboardMap.includes(e.key)) return;
            let pressedKey = e.key.toLocaleLowerCase() ;
            let index = keyboardMap.indexOf(pressedKey);
            let currentKey = allKeys[index];
            this.playNote(currentKey);
        })

        document.addEventListener('keyup', (e) => {
            setTimeout(() => {
                if (!keyboardMap.includes(e.key)) return;
                let pressedKey = e.key.toLocaleLowerCase() ;
                let index = keyboardMap.indexOf(pressedKey);
                let currentKey = allKeys[index];
                this.stopNote(currentKey);
            }
                , 75
            )
    
        })

        // startingOctave.addEventListener('change',this.createKeys.bind(this));
    }    
    
    
    playNote(key) {
        key.classList.add('active');

        if (this.soundSelector.value === 'piano') {
            this.soundHowl = this.pianoHowl;
        } else if(this.soundSelector.value === 'string') {
            this.soundHowl = this.stringHowl;
        } else if (this.soundSelector.value === 'guitar') {
            this.soundHowl = this.guitarHowl;
        } else if (this.soundSelector.value === 'flute') {
            this.soundHowl = this.fluteHowl;
        }
        
        const noteLength = 2000;
        let startTime;
        if (this.soundSelector.value === 'flute') {
             startTime = 300;
        } else {
             startTime = 0;
        }
        
        for (let i = 24; i <= 96; i++) {
            this.soundHowl['_sprite'][i] = [startTime,noteLength];
            startTime += 4000;
        }

        this.soundHowl.volume(parseFloat(this.volumeInput.value));
   
        this.soundHowl.play((note(key.id).midi).toString());
    }

    stopNote(key) {
        key.classList.remove('active');;
        this.soundHowl.stop();
    }
}

export default Key;
