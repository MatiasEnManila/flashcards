import './Flashcard.js';
// import CreateFlashcards from './CreateFlashcards.js';
import { useState, useEffect } from 'react';
import FormDeck from './FormDeck.js';
import Deck from './Deck.js';
import CreateFlashcards from './CreateFlashcards.js';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

//TODO Emulate flashcards order to look like decks order in row/column
//TODO NAVBAR flashcards at the top of the web
//TODO Add distance between rows and nav

function App() {
  let initialDecks = [];
  const savedDecks = JSON.parse(localStorage.getItem('decks'));
  if (savedDecks) {
    initialDecks = savedDecks;
  }

  const [currentPage, setcurrentPage] = useState('home');
  const [deckName, setDeckName] = useState('');
  const [deckIndex, setDeckIndex] = useState(null);
  const [decks, setDecks] = useState(initialDecks); //ARRAY OF DECKS
  const [isEdit, setIsEdit] = useState(false);
  const [searchedDeck, setSearchedDeck] = useState('');
  const [searchedFlashcard, SetsearchedFlashcard] = useState('');


  const handleSearchDeck = (event) => { // VALOR DE INPUT
    setSearchedDeck(event.target.value);
  }

  const handleSearchFlashcard = (event) => {
    SetsearchedFlashcard(event.target.value);
  }

  console.log(searchedFlashcard);

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value);
  }
  
  
  useEffect(() => {
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);
  
  const createDeck = () => {
    setDecks([...decks, {deckName: deckName, flashcards: []}]);
  }
  
  const updatecurrentPage = () => {
    setcurrentPage('home');
  }
  
  const deleteDeck = (indexToDelete) => {
    setDecks(decks.filter((deck, index) => index !== indexToDelete));
  }
  
  const editingDeck = (deckIndex) => { //INDICE DECK QUE SE ESTA EDITANDO
    setDecks(decks.map((deck, i) => {
      if (deckIndex === i) {
        return {...deck, deckName: deckName}; //DEVUELVE UN OBJETO DECK, CON PROPIEDAD DECKNAME Y SU VALOR CORRESPONDIENTE
      } else {
        return deck;
      }
    }));
  }
  
  
  const updateFlashcard = (deckIndex, flashcardIndex, frontFaceFlashcard, backFaceFlashcard) => {
    setDecks(decks.map((deck, index) => {
      if (deckIndex === index) { //already inside deck, where flashcard to be edited is at
        let modifiedFlashcards = deck.flashcards.map((flashcard, i) => {
          if (flashcardIndex === i) {
            return {frontFace: frontFaceFlashcard, backFace: backFaceFlashcard};
          } else {
            return flashcard;
          }
        });
        return  {...deck, flashcards: modifiedFlashcards}
      } else {
        return deck;    
      }
    }))
  }
  
  
  const deleteFlashcard = (deckIndex, flashcardIndex) => { //deckIndex: Donde se encuentra flashcard a deletear. // flashcardIndex flashcard a deletear
    setDecks(decks.map((deck, index) => { // ITA - CH // [0], [1]
      if (deckIndex === index) {
        return {
          ...deck,  
          flashcards: deck.flashcards.filter((flashcard, currentFlashcardIndex) => flashcardIndex !== currentFlashcardIndex)
        };
      } else {
        return deck;
      } 
    }));
  }
  
  
  const updateDeck = (deckName, isEdit, deckIndex) => {
    if (isEdit) {
      setDeckName(deckName);
      setIsEdit(true);
      setDeckIndex(deckIndex);
    } else {
      setDeckName("");
      setIsEdit(false);
    }
    setcurrentPage('form');
  }
  
  const viewFlashcards = (deckIndex) => {
    setDeckIndex(deckIndex);
    setcurrentPage('view-cards');
  }
  
  const createFlashcard = (frontFaceFlashcard, backFaceFlashcard) => { //Parametros vacios??x 
    setDecks(decks.map((deck, i) => {
      if (deckIndex === i) {
        return {...deck, flashcards: [...deck.flashcards, {frontFace: frontFaceFlashcard, backFace: backFaceFlashcard}]};
        // ...deck.flashcards: flashcards en deck[x]  //    {Property: frontFaceFlashcards, backFace: value}
      } else {
        return deck;
      }
    }));
  }
  

  switch (currentPage) { // HOME PAGE
    case 'home':
      const filteredDecks = searchedDeck.length < 2 
        ? decks 
        : decks.filter(deck => deck.deckName.toLowerCase().includes(searchedDeck.toLowerCase()));
      let renderedDecks = [];
      let rowOfDecks = [];

      for (let i = 0; i < filteredDecks.length; i++) {
        rowOfDecks.push(
          <div className="col-4">
            <Deck
              deckName={filteredDecks[i].deckName}
              deleteDeck={() => deleteDeck(i)}
              editDeck={() => updateDeck(filteredDecks[i].deckName, true, i)} // deckName 
              viewCards={() => viewFlashcards(i)}
            />
          </div>
        );
        if ((i + 1) % 3 === 0 || i === filteredDecks.length - 1) {
          renderedDecks.push(<div className="row">{[...rowOfDecks]}</div>);
          rowOfDecks = [];
        }
      } 

      return (
        <div className="container">
          <nav className="navbar navbar-dark bg-dark"> 
          {/* navbar-dark bg-dark */}
           <div className="container-fluid bg-dark">

          <form onSubmit={(event) => event.preventDefault()}>
            <input type="text" className='btn btn-outline-success' onChange={handleSearchDeck} placeholder='Search'/> 
          </form>
          <a>
            <button type='button' className="btn btn-primary" onClick={() => updateDeck('', false)}>Create New Deck</button>
          </a>
           </div>
          </nav>

          { renderedDecks.length > 0 && renderedDecks }

        </div>
      );
      break;
    case 'form':  // CREATE NEW FLASHCARDS + DECKS
      return (
        <FormDeck
          handleChangeDeckName={handleChangeDeckName}
          onSubmit={ isEdit ? () => editingDeck(deckIndex) : createDeck}
          goBack={updatecurrentPage}
          deckName={deckName}
        />  
      );
      break;
    case 'view-cards':
      return (
        <CreateFlashcards
          returnToHomePage={() => setcurrentPage('home')} 
          flashcards={decks[deckIndex].flashcards}
          createFlashcard={createFlashcard}
          handleSearchFlashcard={handleSearchFlashcard}
          searchedFlashcard={searchedFlashcard}
          deleteFlashcard={(flashcardIndex) => deleteFlashcard(deckIndex, flashcardIndex)}
          editFlashcard={(flashcardIndex, frontFaceFlashcard, backFaceFlashcard) => updateFlashcard(deckIndex, flashcardIndex, frontFaceFlashcard, backFaceFlashcard)}//Pasar argumentos a updateFlashcard(); frontface/backface
          />
      );
      break;
  }
};

export default App;
