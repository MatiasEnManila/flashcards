
function Formflashcard({faceForward, faceBackward, createCard, goBack}) {
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
          onChange={faceForward}
        />
        <label htmlFor='BackFaceFlashcard'>Face backward</label>
        <input 
          type="text"
          id="BackFaceFlashcard" 
          name="BackFaceFlashcard"
          onChange={faceBackward}
        />
      </form>
      
      <button onClick={onSubmit}>Submit</button>
      <button onClick={goBack}>Go back</button>
    </div>
  );
}


export default Formflashcard;