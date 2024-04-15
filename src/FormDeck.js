
function FormDeck({handleChangeDeckName, onSubmit, goBack, deckName}) {
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit();
      goBack();
    }
  
    return ( 
      <div>  
        <form onSubmit={handleSubmit}>
          <label htmlFor='deckName'>Insert Name</label>
          <input 
            type="text"
            id="deckName" 
            onChange={handleChangeDeckName}
            value={deckName}
          />
          <button type="submit">Submit</button>
          <button onClick={goBack}>Go back</button>
        </form>
  
      </div>
    );
  }
  
  
  export default FormDeck;