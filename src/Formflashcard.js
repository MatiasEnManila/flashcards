import './Formflashcard.css';

function Formflashcard({handleChangeFrontFace, handleChangeBackFace, onSubmit, goBack, frontFace, backFace}) {
  const handleSubmit = () => {
      onSubmit();
      goBack();
  }

  return ( 
    <>
      <nav className="navbar mb-4 p-4 border-navbar nav-edit-flashcard">
        <div className="container-fluid">  
          <form>
            <label htmlFor="frontFaceFlashcard" className="text-dark-emphasis me-2 fw-bold">Face forward</label>
            <input
              className="label-edit"
              type="text"
              id="frontFaceFlashcard" 
              onChange={handleChangeFrontFace}
              value={frontFace}
              />
            <label htmlFor="BackFaceFlashcard" className="text-dark-emphasis ms-4 me-2 fw-bold">Face backward</label>
            <input
              className="label-edit" //change color of input??
              type="text"
              id="BackFaceFlashcard" 
              onChange={handleChangeBackFace}
              value={backFace}
              />
          </form>
          <a>
            <button type="submit" className="btn btn-success submit-button me-3 fw-bold text-dark" onClick={handleSubmit}>Submit</button>
            <button type="submit" className="btn btn-warning gb-button fw-bold" onClick={goBack}>Go back</button>
          </a>
        </div>
      </nav>
      </>
  );
}


export default Formflashcard;