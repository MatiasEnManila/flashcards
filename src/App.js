import './App.css';
import './Flashcard.js';
import CreateFlashcards from './CreateFlashcards.js';
import Formflashcard from './Formflashcard.js';
import { useState } from 'react';

// TODO view flashcards button homepage - when clicked it should show ceeate new flashcard 

function App() {
  const [homepage, setHomepage] = useState(true);

  if (homepage) {
    return (
      <button type='button' onClick={ () => setHomepage(!homepage)}>View flashcards</button>
    )
  } else {
    return (
      <CreateFlashcards />
    )
  }
};
  

export default App;
