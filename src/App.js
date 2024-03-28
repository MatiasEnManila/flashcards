import './App.css';
import './Flashcard.js';
import CreateFlashcards from './CreateFlashcards.js';
import { useState, useEffect } from 'react';
import FormDeck from './FormDeck.js';
import Deck from './Deck.js';

// TODO Implementar local storage para las decks

function App() {
  let initialDecks = [];
  const savedDecks = JSON.parse(localStorage.getItem('decks'));
  if (savedDecks) {
    initialDecks = savedDecks;
  }

  const [homepage, setHomepage] = useState(true);
  const [deckName, setDeckName] = useState('');
  const [deckIndex, setDeckIndex] = useState(null);
  const [decks, setDecks] = useState(initialDecks);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  
  const createDeck = () => {
    setDecks([...decks, {deckName: deckName}]);
  }

  const updateHomepage = () => {
    setHomepage(!homepage);
  }

  const editingDeck = (deckIndex) => {
    setDecks(decks.map((deck, i) => {
      if (deckIndex === i) {
        return {deckName: deckName};
      } else {
        return deckName;
      }
    }));
  }

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value);
  }

  const deleteDeck = (indexToDelete) => {
    setDecks(decks.filter((deck, index) => index !== indexToDelete));
  }

  const updateDeck = (deckName, isEdit) => {
    if (isEdit) {
      setDeckName(deckName);
      setIsEdit(true);
      setDeckIndex(deckIndex);
    } else {
      setDeckName("");
      setIsEdit(false);
    }
    setHomepage(!homepage);
  }
  
  if (homepage) { // HOME PAGE
    return (
      <>
      { decks.length > 0 && decks.map((deck, i) => (
        <Deck 
        deckName={deck.deckName}
        deleteDeck={() => deleteDeck(i)}
        editDeck={() => updateDeck(deck.deckName, true)}
        onSubmit={ isEdit ? () => editingDeck(deckIndex) : createDeck}
      />)
      )}
        {/* <button type='button' onClick={ () => setHomepage(!homepage)}>View flashcards</button> */}
        <button type='button' onClick={ () => setHomepage(!homepage)}>Create New Deck</button>
      </>
    )
  } else { // CREATE NEW FLASHCARDS + DECKS
    return (
      // <CreateFlashcards returnToHomePage={ () => setHomepage(!homepage)} />
      <FormDeck
        handleChangeDeckName={handleChangeDeckName}
        onSubmit={createDeck}
        goBack={updateHomepage}
        deckName={deckName}
      />
    )
  }
};
  

export default App;
