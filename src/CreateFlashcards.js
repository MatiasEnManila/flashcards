import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard.js';
import Formflashcard from './Formflashcard.js';
import { useEffect, useState } from 'react';


function CreateFlashcards({returnToHomePage, flashcards, createFlashcard, editFlashcard, deleteFlashcard}) {
  const [isEdit, setIsEdit] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(null);
  const [button, setButton] = useState(false);
  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState('');
  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');

  

  const editingFlashcard = (flashcardIndex) => {
    // setFlashcards(flashcards.map((flashcard, i) => {
    //   if (flashcardIndex === i) {
    //     return {frontFace: frontFaceFlashcard, backFace: BackFaceFlashcard};
    //   } else {
    //     return flashcard;
    //   }
    // }));
  }

  const handleChangeFrontFace = (event) => {
    setFrontFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en fronFaceFlashcard "Sergio"
  } 
  
  const handleChangeBackFace = (event) => {
    setBackFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en backFaceFlashcard "Rossi"
  }

  const onCreateFlashcard = () => {
    createFlashcard(frontFaceFlashcard, BackFaceFlashcard);
  }

  const returnHomepage = () => {
    returnToHomePage();
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
      onSubmit={ isEdit ? () => editingFlashcard(flashcardIndex) : onCreateFlashcard} 
      goBack={updateButton}
      frontFace={frontFaceFlashcard}
      backFace={BackFaceFlashcard}
      />
      );  
    } else { // Create new flashcards + See decks
      return (
        <div className="App">
       <button className='button' onClick={() => updateButton(false)}>Create new flashcard</button> 
       <button className='button' onClick={returnHomepage}>Return to homepage</button> 
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

export default CreateFlashcards;
