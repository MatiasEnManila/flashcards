import '../src/chinese-characters/stylesheets/Flashcard.css';
import { useState } from 'react';

function Flashcard({frontFace, backFace, deleteFlashcard, editFlashcard}) {
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
    '(\\#[-a-z\\d_]*)?'+
    '\\.(jpg|jpeg|png|webp|avif|gif|svg)$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  
  
  if (faceForwardFlashcard) {
    return (
      <div className='flashcard front-flash'>
        <div onClick={() => flipcard(!faceForwardFlashcard)}>{isValidUrl(frontFace) ? <img src={(frontFace)}  alt="picture"/> : frontFace}</div>
        <div>
          <button type="button" onClick={deleteFlashcard}>Delete</button> 
          <button type="button" onClick={editFlashcard}>Edit</button> 
        </div>
      </div>
    )
  } else {
    return ( 
      <div className='flashcard back-flash'>
        <div onClick={() => flipcard(!faceForwardFlashcard)}>{isValidUrl(backFace) ? <img src={(backFace)}  alt="picture"/> : backFace}</div>
        <div>
          <button type="button" onClick={deleteFlashcard}>Delete</button>
          <button type="button" onClick={editFlashcard}>Edit</button> 
        </div>
      </div>
    )
  }
 };
    
export default Flashcard;