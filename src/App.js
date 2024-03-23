import './App.css';
import './Flashcard.js';
import CreateFlashcards from './CreateFlashcards.js';
import { useState } from 'react';
import FormDeck from './FormDeck.js';

// TODO Mostrar decks con boton de editar y eliminar, no hace falta que funcionen

function App() {
  const [homepage, setHomepage] = useState(true);
  const [deckName, setDeckName] = useState('');
  const [decks, setDecks] = useState([]);

  const createDeck = () => {
    setDecks([...decks, {deckName: deckName}]);
  }

  const updateHomepage = () => {
    setHomepage(!homepage);
  }

  const handleChangeDeckName = (event) => {
    setDeckName(event.target.value);
  }
  
  if (homepage) { // HOME PAGE
    return (
      <>
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
