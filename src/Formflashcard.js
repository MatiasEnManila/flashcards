
function Formflashcard({handleChangeFrontFace, handleChangeBackFace, createCard, goBack, frontFace, backFace}) {
  const onSubmit = () => {
    createCard();
    goBack();
  }

  return ( 
    <div>  
      <form>
        <label htmlFor='frontFaceFlashcard'>Face forward</label>
        <input 
          type="text"
          id="frontFaceFlashcard" 
          name="frontFaceFlashcard"
          onChange={handleChangeFrontFace}
          value={frontFace}
        />
        <label htmlFor='BackFaceFlashcard'>Face backward</label>
        <input 
          type="text"
          id="BackFaceFlashcard" 
          name="BackFaceFlashcard"
          onChange={handleChangeBackFace}
          value={backFace}
        />
      </form>
      
      <button onClick={onSubmit}>Submit</button>
      <button onClick={goBack}>Go back</button>
    </div>
  );
}


export default Formflashcard;