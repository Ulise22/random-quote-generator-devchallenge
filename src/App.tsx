import { useState, useEffect } from 'react'
import './App.css'
import { Quote } from './components/types';

export default function App () {
  const [quote, setQuote] = useState<Quote>();
  const [authorQuotes, setAuthorQuotes] = useState<Quote[]>()
  const [randomQuote, setRandomQuote] = useState(false)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true)
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
      .then(res => res.json())
        .then(data =>setQuote(data.data[0]))
      .catch(() => console.log("Ha ocurrido un error"))
      .finally(() => {
        setLoading(false);
        setRandomQuote(false)
      })
  }, [randomQuote])

  useEffect(() => {
    fetch(`https://quote-garden.onrender.com/api/v3/quotes?author=${quote?.quoteAuthor}`)
      .then(res => res.json())
        .then(data => setAuthorQuotes(data.data))
  },[quote])

  const backToHomepage = () => {
    setPage(0)
    setRandomQuote(true)
  }

  //console.log(quote)
  console.log(authorQuotes)

  if(loading) return <h1>Loading...</h1>
  
  return(
    <main>
      { page == 0 ? 
      <section className='content__container'>
        <div className='quote__container'>
          <h1 className='quote'>{quote?.quoteText}</h1>
        </div>
        <article className='author__article' onClick={() => setPage(1)}>
          <div className='author__container'>
            <p className='author__name'> {quote?.quoteAuthor} </p>
            <p className='author__genre'> {quote?.quoteGenre} </p>
          </div>
          <span className="material-icons">arrow_right_alt</span>
        </article>
        <button className='random-btn' onClick={() => setRandomQuote(true)}>random<span className="material-icons">autorenew</span></button>
      </section> 
      : 
      <section className='questlist__container'>
        <button className='random-btn' onClick={backToHomepage}>random<span className="material-icons">autorenew</span></button>
        <h1 className='questlist__title'> {quote?.quoteAuthor} </h1>
        <ul className='questlist'>
          { authorQuotes?.map(quote => {
            return(
              <li className='list__item' key={quote._id}>
                <div className='quote__container'>
                  <h1 className='quote'>{quote?.quoteText}</h1>
                </div>
              </li>
            )
          }) }
        </ul>
      </section> }

      <footer>
        <p className='footer__text'>created by <a target='_Blank' href='https://github.com/Ulise22'>Ulises</a> - devChallenges.io</p>
      </footer>
    </main>
  )
}