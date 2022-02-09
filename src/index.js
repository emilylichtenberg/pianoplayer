// import Key from './scripts/key';
import Key from './scripts/key2';
import Metronome from './scripts/metronome';
import {Howler, Howl} from 'howler'; 
import {note} from '@tonaljs/tonal';

document.addEventListener('DOMContentLoaded', () => {
    const keys = new Key();
    const metro = new Metronome();

    const popUp = document.querySelector('.instructions-popUp')
    const instructionsButton = document.querySelector('.instructions')
    const exit = document.querySelector('.exit-instructions')

    instructionsButton.addEventListener('click', () => popUp.classList.toggle('display'));
    exit.addEventListener('click', () => popUp.classList.toggle('display'));

    // const audio = document.getElementById('welcome-song');
    // audio.play();
});