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

  //console.log(quote)
  console.log(authorQuotes)

  if(loading) return <h1>Loading...</h1>
  
  return(
    <main>
      { page == 0 ? 
      <section>
        <div className='quote__container'>
          <span className='quote__line'></span>
          <h1 className='quote'>{quote?.quoteText}</h1>
        </div>
        <div>
          <p onClick={() => setPage(1)}> {quote?.quoteAuthor} </p>
          <p> {quote?.quoteGenre} </p>
        </div>
        <button onClick={() => setRandomQuote(true)}>Random</button>
      </section> 
      : 
      <section>
        <button onClick={() => setPage(0)}>Random</button>
        <h1> {quote?.quoteAuthor} </h1>
        <ul>
          { authorQuotes?.map(quote => {
            return(
              <li key={quote._id}>
                <h2> {quote.quoteText} </h2>
              </li>
            )
          }) }
        </ul>
      </section> }

      <footer>
        <p>created by <a target='_Blank' href='https://github.com/Ulise22'>Ulises</a> - devChallenges.io</p>
      </footer>
    </main>
  )
}