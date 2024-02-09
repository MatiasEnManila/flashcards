import '../src/chinese-characters/stylesheets/Flashcard.css';
// import ChineseCharacter from './chinese-characters/chinese-character.png';
import { useState } from 'react';

function Flashcard({frontFace, backFace}) {
    // TODO identify when an URL inserted - check if its an url t/f
    const [faceForwardFlashcard, setfaceForwardFlashcard] = useState(true);

    const flipcard = (newValue) => {
        setfaceForwardFlashcard(newValue);
    }



    if (faceForwardFlashcard) {
        return  <div className='flashcard front-flash' onClick={() => flipcard(!faceForwardFlashcard)}> {frontFace}</div>
    } else {
        return <div className='flashcard back-flash' onClick={() => flipcard(!faceForwardFlashcard)}> {backFace}</div>
    }       
}


{/* // <img src={ChineseCharacter} className="chinese-character" alt="kanji"  */}
export default Flashcard;