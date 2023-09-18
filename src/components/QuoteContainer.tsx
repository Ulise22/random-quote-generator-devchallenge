import { Quote } from "./types/types";

export default function QuoteContainer ({quote, changePage, changeRandomQuote} : {quote: Quote | undefined, changePage: (page: number) => void, changeRandomQuote: (randomQuote: boolean) => void}) {
    return(
        <section className='content__container'>
        <div className='quote__container'>
          <h1 className='quote'>"{quote?.quoteText}"</h1>
        </div>
        <article className='author__article' onClick={() => changePage(1)}>
          <div className='author__container'>
            <p className='author__name'> {quote?.quoteAuthor} </p>
            <p className='author__genre'> {quote?.quoteGenre} </p>
          </div>
          <span className="material-icons">arrow_right_alt</span>
        </article>
        <button className='random-btn' onClick={() => changeRandomQuote(true)}>random<span className="material-icons">autorenew</span></button>
      </section> 
    )
}