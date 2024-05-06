import './App.css';
import './Flashcard.js';  
import Flashcard from './Flashcard.js';
import Formflashcard from './Formflashcard.js';
import { useEffect, useState } from 'react';


function CreateFlashcards({returnToHomePage, flashcards, createFlashcard, deleteFlashcard, editFlashcard, handleSearchFlashcard, searchedFlashcard}) {
  const [isEdit, setIsEdit] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(null);
  const [button, setButton] = useState(false);
  const [frontFaceFlashcard, setFrontFaceFlashcard] = useState('');
  const [BackFaceFlashcard, setBackFaceFlashcard] = useState('');

  //todo grids flashcards

  const editingFlashcard = () => {
        editFlashcard(flashcardIndex, frontFaceFlashcard, BackFaceFlashcard);
  } 

  const handleChangeFrontFace = (event) => {
    setFrontFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en fronFaceFlashcard "Qing tian"
  } 
  
  const handleChangeBackFace = (event) => {
    setBackFaceFlashcard(event.target.value); // Obtiene y guarda el input del campo en backFaceFlashcard "Sunny"
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
        onSubmit={ isEdit ? editingFlashcard : onCreateFlashcard} 
        goBack={updateButton}
        frontFace={frontFaceFlashcard}
        backFace={BackFaceFlashcard}
      />
      );  
    } else { // Create new flashcards + See decks
      const filteredFlashcard = searchedFlashcard.length < 2 
        ? flashcards 
        : flashcards.filter(
          (flashcard, index) => (
            flashcard.frontFace.toLowerCase().includes(searchedFlashcard.toLowerCase()) 
            || flashcard.backFace.toLowerCase().includes(searchedFlashcard.toLowerCase())
          )
        );
      return (
       <div className="App">
        <nav className='navbar bg-body-tertiary'>
          <div className='container-fluid'>

            <form onSubmit={(event) => event.preventDefault()}>
              <input type="text" onChange={handleSearchFlashcard} placeholder='Search'/> 
            </form>

            <button className="btn btn-success" onClick={() => updateButton(false)}>Create new flashcard</button>   
            <button className="btn btn-warning" onClick={returnHomepage}>Return to homepage</button> 
          </div>
        </nav>
          <div>        
          {flashcards.length > 0 && filteredFlashcard.map((flashcard, i) => (
            <Flashcard
            frontFace={flashcard.frontFace} 
            backFace={flashcard.backFace} 
            deleteFlashcard={() => deleteFlashcard(i)}
            editFlashcard={() => updateButton(true, flashcard.frontFace, flashcard.backFace, i)} 
            testFlashcard={editingFlashcard} // HERE THOU
            />)
          )}
        </div>
      </div> 
    );
    }
}

export default CreateFlashcards;
