import '../src/chinese-characters/stylesheets/Flashcard.css';
// import ChineseCharacter from './chinese-characters/chinese-character.png';
import { useState } from 'react';

function Flashcard({frontFace, backFace}) {
    const [faceForwardFlashcard, setfaceForwardFlashcard] = useState(true);

    const flipcard = (newValue) => {
        setfaceForwardFlashcard(newValue);
    }



    if (faceForwardFlashcard) {
        return  <div className='front-flash' onClick={() => flipcard(!faceForwardFlashcard)}> {frontFace}</div>
    } else {
        return <div className="back-flash" onClick={() => flipcard(!faceForwardFlashcard)}> {backFace}</div>
    }       
}


{/* // <img src={ChineseCharacter} className="chinese-character" alt="kanji"  */}
export default Flashcard;