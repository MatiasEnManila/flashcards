import './App.css';
import './CreateFlashcards.css';
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
      let renderedFlashcards = [];
      let rowOfFlashcards = [];

      for (let i = 0; i < filteredFlashcard.length; i++) {
        rowOfFlashcards.push(
          <div className="col">
            <Flashcard
              frontFace={filteredFlashcard[i].frontFace} 
              backFace={filteredFlashcard[i].backFace} 
              deleteFlashcard={() => deleteFlashcard(i)}
              editFlashcard={() => updateButton(true, filteredFlashcard[i].frontFace, filteredFlashcard[i].backFace, i)} 
              testFlashcard={editingFlashcard} // HERE THOU
            />
          </div>
          );
          if ((i + 1) % 3 === 0 || i === filteredFlashcard.length - 1) {
            renderedFlashcards.push(<div className="row">{[...rowOfFlashcards]}</div>)
            rowOfFlashcards = [];
          }
        }
        
      return (
        <div className="bg-picture-flashcards" style={{height: "100%"}}>
          <div>
            <nav className="navbar mb-4 p-4 nav-flashcards nav-color">
              <div className="container-fluid">
                <form onSubmit={(event) => event.preventDefault()}>
                  <input 
                    className="btn btn-danger text-light-emphasis fw-bold" 
                    type="text"
                    onChange={handleSearchFlashcard} 
                    placeholder='Search flashcard'
                    /> 
                </form>
                  <a>
                    <button type="submit" className="btn btn-success me-3 fw-bold" onClick={() => updateButton(false)}>Create new flashcard</button>   
                    <button className="btn btn-warning button-border fw-bold" onClick={returnHomepage}>Return to homepage</button>
                  </a>
              </div>
            </nav>
          </div>
            <div className="container-fluid flashcard-container">
              <div className="row">
                <div className="col"></div>
                <div className="col">
                  {flashcards.length > 0 && renderedFlashcards}
                </div>
                <div className="col"></div>
              </div>
            </div>
        </div>
     );
    }
}

export default CreateFlashcards;
