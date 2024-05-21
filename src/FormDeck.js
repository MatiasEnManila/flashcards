import './App.css';
import './FormDeck.css';


function FormDeck({handleChangeDeckName, onSubmit, goBack, deckName}) {
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit();
      goBack();
    }
  
    return ( 
      <>
      <div className="bg-pic-create-deck background-size">
        <nav className="navbar mb-3 p-4 nav-color-deck navbar-deck-picture"> 
          <div className="container-fluid">  
            <form onSubmit={handleSubmit}>
              <input 
                className="btn btn-outline-warning search-deck fw-bold content"
                type="text"
                id="deckName" 
                onChange={handleChangeDeckName}
                value={deckName}
                placeholder="New deck name"
                />
            </form> 
              <a>
                <button type="submit" className="btn btn-primary button-submit ms-2 text-light fw-bold" onClick={handleSubmit}>Submit</button>
                <button className="btn btn-warning button-gb ms-2 fw-bold text-light" onClick={goBack}>Go back</button>          
              </a>  
          </div>
        </nav>
      </div>
      </>
    );
  }
  
  
  export default FormDeck;