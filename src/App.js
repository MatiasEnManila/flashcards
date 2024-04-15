import './App.css';
import './Flashcard.js';
// import CreateFlashcards from './CreateFlashcards.js';
import { useState, useEffect } from 'react';
import FormDeck from './FormDeck.js';
import Deck from './Deck.js';
import CreateFlashcards from './CreateFlashcards.js';

// TODO edit flashcards button

function App() {
  let initialDecks = [];
  const savedDecks = JSON.parse(localStorage.getItem('decks')); //Local storaged decks
  if (savedDecks) {
    initialDecks = savedDecks;
  }

  const [currentPage, setcurrentPage] = useState('home');
  const [deckName, setDeckName] = useState(''); // Italiano, Noruego, Chino - Properties
  const [deckIndex, setDeckIndex] = useState(null);
  const [decks, setDecks] = useState(initialDecks); //ARRAY OF DECKS
  const [isEdit, setIsEdit] = useState(false);

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
    setDecks(decks.map((deck, i) => { //ITERA POR CADA UNA DE LAS DECKS
      if (deckIndex === i) {
        return {...deck, deckName: deckName}; //DEVUELVE UN OBJETO DECK, CON PROPIEDAD DECKNAME Y SU VALOR CORRESPONDIENTE
      } else {
        return deck;
      }
    }));
  }
  

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value);
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

  const editFlashcards = (deckIndex, flashcardIndex) => {
    setDecks(decks.map((deck, i) => {
        if (deckIndex === i) {
          return {...deck, flashcard: deck.flashcard};
        } else {
          return deck
        }
    }))
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
      return (
        <>
        { decks.length > 0 && decks.map((deck, i) => (
          <Deck 
          deckName={deck.deckName}
          deleteDeck={() => deleteDeck(i)}
          editDeck={() => updateDeck(deck.deckName, true, i)}
          viewCards={() => viewFlashcards(i)}
        />)
        )}
          {/* <button type='button' onClick={ () => setcurrentPage(!currentPage)}>View flashcards</button> */}
          <button type='button' onClick={() => updateDeck('', false)}>Create New Deck</button>
        </>
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
        <>
          <CreateFlashcards  //emular deck
          returnToHomePage={() => setcurrentPage('home')} 
          flashcards={decks[deckIndex].flashcards}
          createFlashcard={createFlashcard}
          deleteFlashcard={(flashcardIndex) => deleteFlashcard(deckIndex, flashcardIndex)} //deckIndex
          editFlashcard={editFlashcards}
        />)
        </>
      );
      break;
  }
};

export default App;
