
function Formflashcard({handleChangeFrontFace, handleChangeBackFace, onSubmit, goBack, frontFace, backFace}) {
  const handleSubmit = () => {
      onSubmit();
      goBack();
      
  }

  return ( 
    <div>  
      <form>
        <label htmlFor='frontFaceFlashcard'>Face forward</label>
        <input 
          type="text"
          id="frontFaceFlashcard" 
          onChange={handleChangeFrontFace}
          value={frontFace}
        />
        <label htmlFor='BackFaceFlashcard'>Face backward</label>
        <input 
          type="text"
          id="BackFaceFlashcard" 
          onChange={handleChangeBackFace}
          value={backFace}
        />
      </form>

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={goBack}>Go back</button>
     </div>
  );
}


export default Formflashcard;