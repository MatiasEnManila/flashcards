// import { isVisible } from '@testing-library/user-event/dist/utils';
import '../src/chinese-characters/stylesheets/Flashcard.css';
import { useState } from 'react';

function Flashcard({frontFace, backFace, deleteFlashcard}) {
    // TODO click event handler para borrar la flashcards en la cual uno clickea, usar metodo filter para deletearla?
    // TODO  Render: Actulizar el DOM? el html
    // TODO  Que es lo que quiero filtrar para poder eliminar?
    const [faceForwardFlashcard, setfaceForwardFlashcard] = useState(true);
    // const [deleteFlashcard, setDeleteFlashcard]  = useState(frontFace, backFace);

    // const onDelete = () => {
    //     setDeleteFlashcard(deleteFlashcard.filter(flashcard => flashcard))
    // }
    
    const flipcard = (newValue) => {
        setfaceForwardFlashcard(newValue);
    }
        
    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?'+
        '\\.(jpg|jpeg|png|webp|avif|gif|svg)$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    if (faceForwardFlashcard) {
        return (
            <div className='flashcard front-flash'>
                <div onClick={() => flipcard(!faceForwardFlashcard)}>{isValidUrl(frontFace) ? <img src={(frontFace)}  alt="picture"/> : frontFace}</div>
                <div>
                <button type="button" onClick={deleteFlashcard}>Borrar flashcard</button> 
                    {/* Filtrar todo lo que no sea una string 
                      button tiene que devolver un return? Return sobre return? 
                    */}
                </div>
            </div>
        )
    } else {
        return ( 
            <div className='flashcard back-flash'>
                <div onClick={() => flipcard(!faceForwardFlashcard)}>{isValidUrl(backFace) ? <img src={(backFace)}  alt="picture"/> : backFace}</div>
                <div>
                    {/* <button onClick={remove}>Delete</button> */}
                </div>
            </div>
        )
      }
    };


{/* // <img src={ChineseCharacter} className="chinese-character" alt="kanji"  */}
export default Flashcard;