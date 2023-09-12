import { useState, useEffect } from 'react'
import './App.css'

type Quote = {
  quoteAuthor: string,
  quoteGenre: string,
  quoteText: string,
  __v: number,
  _id: string,
}

export default function App () {
  const [quote, setQuote] = useState<Quote>();
  const [randomQuote, setRandomQuote] = useState(false)
  const [loading, setLoading] = useState(false)

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

  console.log(quote)
  
   return(
    <main>
      {loading && <h1>Loading...</h1>}
      <h1>{quote?.quoteText}</h1>
      <button onClick={() => setRandomQuote(true)}>Random</button>
    </main>
  )
}