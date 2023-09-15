import { useState, useEffect } from 'react'
import './App.css'
import { Quote } from './components/types/types';
import QuoteContainer from './components/QuoteContainer';
import QuoteList from './components/QuotesList';
import Footer from './components/Footer';

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

  if(loading) return <h1>Loading...</h1>
  
  return(
    <main>
      { page == 0 ? 
      <QuoteContainer quote={quote} changePage={setPage} changeRandomQuote={setRandomQuote} />
      : 
      <QuoteList quote={quote} backToHomepage={backToHomepage} authorQuotes={authorQuotes} /> }

      <Footer />
    </main>
  )
}