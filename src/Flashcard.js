import { isVisible } from '@testing-library/user-event/dist/utils';
import '../src/chinese-characters/stylesheets/Flashcard.css';
// import ChineseCharacter from './chinese-characters/chinese-character.png';
import { useState } from 'react';

function Flashcard({frontFace, backFace}) {
    // TODO how to add a picture from an URL // texto
    const [faceForwardFlashcard, setfaceForwardFlashcard] = useState(true);

    const flipcard = (newValue) => {
        setfaceForwardFlashcard(newValue);
    }
        
    const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
    }

    if (faceForwardFlashcard) {
        return (
            <div className='flashcard front-flash' onClick={() => flipcard(!faceForwardFlashcard)}>
                {isValidUrl(frontFace) ? <img src={(frontFace)}  alt="picture"/> : frontFace}
            </div>
        )
    } else {
        return ( 
            <div className='flashcard back-flash' onClick={() => flipcard(!faceForwardFlashcard)}>
                {isValidUrl(backFace) ? <img src={(backFace)}  alt="picture"/> : backFace}
            </div>
        )
      }
    };


{/* // <img src={ChineseCharacter} className="chinese-character" alt="kanji"  */}
export default Flashcard;