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

  const handleChangeFrontFace = (event) => {
    setFrontFaceFlashcard(event.target.value); // Guarda el input del campo en fronFaceFlashcard
  } 
  
  const handleChangeBackFace = (event) => {
    setBackFaceFlashcard(event.target.value);
  }

  
  const createFlashcard = () => { // Guarda en flashcards el input puesto en forma de objeto
    setFlashcards([...flashcards, {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard}]);
  }
  
  const updateButton = () => {
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
          />
          <label htmlFor='BackFaceFlashcard'>Face backward</label>
          <input 
            type="text"
            id="BackFaceFlashcard" 
            name="BackFaceFlashcard"
            onChange={handleChangeBackFace}
          />
        </form>
        <button onClick={createFlashcard}>Submit</button>
        <button onClick={() => setButton(!button)}>Go back</button>
      </div>

      );  


    } else { // HOME  
      return (
        <div className="App">
          <button className='button' onClick={() => updateButton(!button)}>Create new flashcard</button>
          <div>
          {flashcards.length > 0 && flashcards.map((flashcard, i) => <Flashcard frontFace={flashcard.frontFace} backFace={flashcard.backFace} deleteFlashcard={() => deleteFlashcard(i)}/>)}
          </div>
        </div> 
    );
  }
}









export default App;
