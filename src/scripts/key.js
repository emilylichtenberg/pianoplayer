import Oscilator from './oscilator';

const Octavian = require('octavian');




const keyboardMap = ['q','2','w','3','e','r','5','t','6','y','7','u','i','9','o','0','p','z','s','x','d','c','f','v','b','h','n','j','m',',','l','.',';','/',"'",""];
let notesToPlay;
let startTime;

class Key {

    constructor() {
        this.createKeys();
        this.bindClick();
        this.bindKeys();
        // this.recorder = document.getElementById('record');
        // this.recorder.addEventListener('click',this.changeRecordStatus.bind(this))
        // this.playButton = document.getElementById('play-pause')
        // this.init();
    }

    createKeys() {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const keyColors = ["W","B","W","B","W","W","B","W","B","W","B","W"];
        const octave = [3,4,5];
        const piano = document.querySelector(".piano")
        for (let i = 0; i < octave.length; i++) {
            for (let j = 0; j < notes.length ; j++) {
                let key = document.createElement("div");
                key.setAttribute('id',`${notes[j%notes.length]}${octave[i]}`);
                key.classList.add(`${keyColors[j%keyColors.length]}`);
                piano.append(key);  
            }
        }
    }

    bindClick() {
        const allKeys = Array.from(document.querySelector(".piano").children);
        allKeys.forEach((key,i) => {
            // debugger
            key.addEventListener('mousedown', this.playKey.bind(key));
            key.innerHTML = keyboardMap[i];
        })
    }


    bindKeys() {
        const allKeys = Array.from(document.querySelector(".piano").children);
        let that = this
        document.addEventListener('keydown', (e) => {
            // debugger 
            if (e.repeat) return;
            let pressedKey = e.key;
            let index = keyboardMap.indexOf(pressedKey);
            let currentKey = allKeys[index];
            if (index > -1) that.playKey.bind(currentKey)();
        })
    }

    playKey() {
        const key = this
       
        this.classList.add("active");
        
        const note = new Octavian.Note(`${this.id}`);
        const osc = new Oscilator(key,note)

        // if (this.recording()) notestoPlay.push({
        //     key: note,
        //     noteStart: Date.now() - startTime,
        //     noteEnd: 'x'
        // })

        osc.start();
        key.addEventListener('mouseup', osc.stop.bind(osc));
        document.addEventListener('keyup', osc.stop.bind(osc));
    }

    recording() {
        return this.recorder.classList.contains('active');
    }

    startRecord() {
        this.recorder.innerHTML = 'STOP';
        startTime = Date.now();
        notesToPlay = [];
    }

    endRecord() {
        this.recorder.innerHTML = 'RECORD';
        this.playAllNotes();
        //return notes?
    }
    changeRecordStatus() {
        this.recorder.classList.toggle('active');
        if (this.recorder.classList.contains('active')) {
            this.startRecord();
        } else {
            this.endRecord();
        }
    }

    playAllNotes() {
        console.log(notesToPlay)
        //pass in array of notes/time and do a for each with the key.playKey function?
    }
    
}

export default Key;
