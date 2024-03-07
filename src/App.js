import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard.js';
import Formflashcard from './Formflashcard.js'
import { useState } from 'react';

// TODO submit button redirects you home page

function App(props) {
  const [button, setButton] = useState(false);


  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState(''); 
  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');
  
  const [flashcards, setFlashcards] = useState([]);
  
  console.log(Formflashcard);
  
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
      <Formflashcard
        faceForward={handleChangeFrontFace}
        faceBackward={handleChangeBackFace} 
        createCard={createFlashcard} 
        goBack={updateButton}
      />
    );  
  } else { // HOME  
    return (
      <div className="App">
        <button className='button' onClick={() => updateButton()}>Create new flashcard</button>
        <div>
        {flashcards.length > 0 && flashcards.map((flashcard, i) => <Flashcard frontFace={flashcard.frontFace} backFace={flashcard.backFace} deleteFlashcard={() => deleteFlashcard(i)} />)}
        </div>
      </div> 
    );
  }
}

export default App;
