
function FormDeck({handleChangeDeckName, onSubmit, goBack, deckName}) {
    const handleSubmit = () => {
        onSubmit();
        goBack();
    }
  
    return ( 
      <div>  
        <form>
          <label htmlFor='deckName'>Insert Name</label>
          <input 
            type="text"
            id="deckName" 
            onChange={handleChangeDeckName}
            value={deckName}
          />
        </form>
  
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={goBack}>Go back</button>
       </div>
    );
  }
  
  
  export default FormDeck;