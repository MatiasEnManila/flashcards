import '../src/chinese-characters/stylesheets/Flashcard.css';

function Deck({deckName, deleteDeck, editDeck, viewCards}) {
  const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?'+
    '\\.(jpg|jpeg|png|webp|avif|gif|svg)$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

  return (
    <div className='flashcard front-flash'>
      <div>{isValidUrl(deckName) ? <img src={(deckName)}  alt="picture"/> : deckName}</div>
      <div>
        <button type="button" onClick={viewCards}>View cards</button> 
        <button type="button" onClick={editDeck}>Edit</button> 
        <button type="button" onClick={deleteDeck}>Delete</button> 
      </div>
    </div>
  )
};
    
export default Deck;