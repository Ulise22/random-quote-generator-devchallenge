import { useState, useEffect } from 'react'
import './App.css'

export default function App () {
  const [quotes, setQuotes] = useState();

  useEffect(() => {
    fetch('https://quote-garden.onrender.com/api/v3/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data))
  }, [])

  console.log(quotes)
  return(
    <main>
      <h1>Hola mundillo</h1>
    </main>
  )
}