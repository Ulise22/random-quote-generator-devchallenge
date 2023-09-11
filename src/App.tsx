import { useState, useEffect } from 'react'
import './App.css'

export default function App () {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.data[0]);
        setLoading(false);
      })
  }, [])

  console.log(quote)

  if(loading) return <h1>loading...</h1>
  
   return(
    <main>
      {/* <h1>{quote.quoteText}</h1> */}
    </main>
  )
}