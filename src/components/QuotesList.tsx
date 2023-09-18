import { Quote } from "./types/types"

export default function QuoteList ({authorQuotes, quote, backToHomepage} : {authorQuotes: Quote[] | undefined, quote: Quote | undefined, backToHomepage: () => void}) {
    return(
        <section className='questlist__container'>
        <button className='random-btn' onClick={backToHomepage}>random<span className="material-icons">autorenew</span></button>
        <h1 className='questlist__title'> {quote?.quoteAuthor} </h1>
        <ul className='questlist'>
          { authorQuotes?.map(quote => {
            return(
              <li className='list__item' key={quote._id}>
                <div className='quote__container'>
                  <h1 className='quote'>"{quote?.quoteText}"</h1>
                </div>
              </li>
            )
          }) }
        </ul>
      </section>
    )
}