import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard';
import { useState } from 'react';

function App(props) {
  const [button, setButton] = useState(false);
  
  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState('');
  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');
  const [flashcards, setFlashCards] = useState([]);

  console.log(flashcards);

  const handleChangeFrontFace = (event) => { //Cara delantera de la flashcard
    setFrontFaceFlashcard(event.target.value); //guarda el input del campo en fronFaceFlashcard
  } 
  
  const handleChangeBackFace = (event) => { //cara trasera de la flashcard
    setBackFaceFlashcard(event.target.value);
  }

  
  const handleClick = () => { // Guarda en flashcards el input puesto en forma de objeto
    setFlashCards([...flashcards, {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard}]);
  }
  
  const updateButton = () => { //
    setButton(!button);
  }

  const numbers = [1, 2, 3, 4];

  


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
        {/* Acá se guardaría el input de FFF BFF en forma de objeto? */}
        <button onClick={handleClick}>Submit</button>
        <button onClick={() => setButton(!button)}>Go back</button>
      </div>

      );  


    } else { // HOME  
      return (
        <div className="App">
          <button className='button' onClick={() => updateButton(!button)}>Create new deck</button>
          <div>
          {flashcards.length > 0 && flashcards.map(flashcard => <Flashcard frontFace={flashcard.frontFace} backFace={flashcard.backFace}/>)}
          </div>
        </div> 
    );
  }
  {/* <button className='button'>Button 2</button>
    <button className='button'>Button 3</button> */}
}









export default App;
