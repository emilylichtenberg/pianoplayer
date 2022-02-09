// // THIS FILE IS TEST CODE FOR A FUTURE FEATURE:


// import {Howler, Howl} from 'howler'; 
// import {note} from 'tonal';

// // class HowlerClass {

// //     constructor() {
// //         this.howl = new Howl({
// //             src: ['./src/audio/pianosprite.mp3'],
// //             html5: true,
// //             buffer: true,
// //             onload() {
// //                 console.log('sound file loaded')
// //                 this.init();
// //             },
// //             onloaderror(error,message) {
// //                 console.log('Error:', {error, message})
// //             }            
// //         })
// //         // this.init();
// //     }

// //     init() {
// //         console.log('yay')
// //         this.howl.play();
// //     }


// // }


// // export default HowlerClass;
// const sound = new Howl({
//     src: ['./dist/audio/pianosprite.mp3'],
//     html5: true,
//     buffer: true,
//     onload() {
//         console.log('sound file loaded')
//         soundEngine.init();
//     },
//     onloaderror(error,message) {
//         console.log('Error:', {error, message})
//     }  
// })


// const soundEngine = {
//     init() {
//         const noteLength = 2200;
//         let startTimeInd = 0;
//         for (let i = 24; i <= 96; i++) {
//             sound['_sprite'][i] = [startTimeInd, noteLength];
//             startTimeInd += noteLength;
//         }
//     },

//     play(key) {
//         let MIDINum = note(key).midi;
//         sound.volume(.75);
//         sound.play(MIDINum.toString());
//     }
// }