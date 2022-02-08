import {Howler, Howl} from 'howler'; 

class HowlerClass {

    constructor() {
        this.howl = new Howl({
            src: ['./src/audio/pianosprite.mp3'],
            onload() {
                console.log('sound file loaded')
                this.init();
            },
            onloaderror(error,message) {
                console.log('Error:', {error, message})
            }
        })
        // this.init();
    }

    init() {
        console.log('yay')
        this.howl.play();
    }


}


export default HowlerClass;