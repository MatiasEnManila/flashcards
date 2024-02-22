import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard';
import { useState } from 'react';

function App(props) {

  const [button, setButton] = useState(false);  
  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState(''); 

  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  

  const deleteFlashcard = (indexToDelete) => {
    setFlashcards(flashcards.filter((flashcard, index) => index != indexToDelete));
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

  const handleChangeFrontFace = (event) => { //Cara delantera de la flashcard
      setFrontFaceFlashcard(event.target.value); //guarda el input del campo en fronFaceFlashcard}
  } 
  
  const handleChangeBackFace = (event) => {
    if (isValidUrl(event.target.value)) {
    } else {
      setBackFaceFlashcard(event.target.value);
    }
  }

  
  const handleClick = () => { // Guarda en flashcards el input puesto en forma de objeto
    setFlashcards([...flashcards, {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard}]);
  }
  
  const updateButton = () => { //
    setButton(!button);
  }

  if (button) {
    return ( 
      <div>  
        <form>
          <label htmlFor='frontFaceFlashcard'>Face forward</label>
          <input 
            type="text"
            id="frontFaceFlashcard" 
            name="frontFaceFlashcard"
            onChange={handleChangeFrontFace}
            value={frontFaceFlashcard}>
          </input>

          <label htmlFor='BackFaceFlashcard'>Face backward</label>
          <input 
            type="text"
            id="BackFaceFlashcard" 
            name="BackFaceFlashcard"
            onChange={handleChangeBackFace}
            value={BackFaceFlashcard}>
          </input>
        </form>
        <button onClick={handleClick}>Submit</button>
        <button onClick={() => setButton(!button)}>Go back</button>
      </div>

      );  


    } else { // HOME  
      return (
        <div className="App">

          {/* <div>
           <button onClick={() => setIsTrue(!isTrue)}>Button</button>
           {isTrue ? console.log("true") : console.log("fake")}
          </div>   */}
          <button className='button' onClick={() => updateButton(!button)}>Create new deck</button>
          <div>
          {flashcards.length > 0 && flashcards.map((flashcard, i) => <Flashcard frontFace={flashcard.frontFace} backFace={flashcard.backFace} deleteFlashcard={() => deleteFlashcard(i)}/>)}
          </div>
        </div> 
    );
  }
  {/* <button className='button'>Button 2</button>
    <button className='button'>Button 3</button> */}
}









export default App;
