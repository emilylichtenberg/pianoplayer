// import Key from './scripts/key';
import Key from './scripts/key2';
import Metronome from './scripts/metronome';

document.addEventListener('DOMContentLoaded', () => {
    const keys = new Key();
    const metro = new Metronome();

    const popUp = document.querySelector('.instructions-popUp')
    const instructionsButton = document.querySelector('.instructions')
    const exit = document.querySelector('.exit-instructions')

    instructionsButton.addEventListener('click', () => popUp.classList.toggle('display'));
    exit.addEventListener('click', () => popUp.classList.toggle('display'));

});