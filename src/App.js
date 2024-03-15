import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard.js';
import Formflashcard from './Formflashcard.js';
import { useEffect, useState } from 'react';

// TODO 

function App(props) {  
  let initialFlashcards = [];
  const savedFlashcards = JSON.parse(localStorage.getItem('flashcards'));
  if (savedFlashcards) {
    initialFlashcards = savedFlashcards;
  }
  
  const [flashcards, setFlashcards] = useState(initialFlashcards); //Flashcard creation
  const [isEdit, setIsEdit] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(null);
  const [button, setButton] = useState(false);
  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState('');
  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');
  
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);


  const deleteFlashcard = (indexToDelete) => {
    setFlashcards(flashcards.filter((flashcard, index) => index != indexToDelete));
  }

  const editingFlashcard = (flashcardIndex) => {
    setFlashcards(flashcards.map((flashcard, i) => {
      if (flashcardIndex === i) {
        return {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard};
      } else {
        return flashcard;
      }
    }));
  }

  const handleChangeFrontFace = (event) => {
    setFrontFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en fronFaceFlashcard "Sergio"
  } 
  
  const handleChangeBackFace = (event) => {
    setBackFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en backFaceFlashcard "Rossi"
  }

  const createFlashcard = () => { // Guarda en array "flashcards" input puesto, en forma de objeto
    setFlashcards([...flashcards, {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard}]);
  }

  
  const updateButton = (isEdit, frontFace, backFace, flashcardIndex) => {
    if (isEdit) {
      setFrontFaceFlashcard(frontFace);
      setBackFaceFlashcard(backFace);
      setIsEdit(true);
      setFlashcardIndex(flashcardIndex);
    } else {
      setFrontFaceFlashcard("");
      setBackFaceFlashcard("");
      setIsEdit(false);
    } 
    setButton(!button);
  }

  if (button) {
    return (
      <Formflashcard
        handleChangeFrontFace={handleChangeFrontFace}
        handleChangeBackFace={handleChangeBackFace} 
        onSubmit={ isEdit ? () => editingFlashcard(flashcardIndex) : createFlashcard} 
        goBack={updateButton}
        frontFace={frontFaceFlashcard}
        backFace={BackFaceFlashcard}
      />
    );  
  } else { // HOME PAGE 
    return (
      <div className="App">
        {/* No se toca */}
        <button className='button' onClick={() => updateButton(false)}>Create new flashcard</button> 
        <div>
        {flashcards.length > 0 && flashcards.map((flashcard, i) => (
          <Flashcard 
            frontFace={flashcard.frontFace} 
            backFace={flashcard.backFace} 
            deleteFlashcard={() => deleteFlashcard(i)}
            editFlashcard={() => updateButton(true, flashcard.frontFace, flashcard.backFace, i)} //
          />)
        )}
        </div>
      </div> 
    );
  }
}

export default App;
