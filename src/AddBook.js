import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book';


class AddBook extends React.Component { 
    constructor(props) {
      super(props);
      this.state = { 
        query: '',
        books: [],
        homeBooks: [],
        shelf: ''
      }
    }

     queryHandler = (event) => {
       this.setState({
        query : event.target.value
       })

       BooksAPI.getAll().then( (homeBooks) => {
        this.setState({
          homeBooks 
        })
      })
      
       if(this.state.query !== ''){
          BooksAPI.search(this.state.query).then((books) =>{
          if (Array.isArray(books)){
            this.setState({  books: books  })          
        } if(this.state.query === ''){         
            this.setState({  books: [] }) 
         }                         
      })    
    }
       this.state.books.map( (book) => {  
         if(this.state.query !== book.authors || this.state.query !== book.title){
            this.setState({  books: [] }) 
         }                                
      })                   
   }

   updateBookShelf = (book, newShelf) => {
     if(book.shelf !== newShelf){   
        BooksAPI.update(book, newShelf)     
        book.shelf = newShelf
        this.setState({
          shelf: newShelf
        })
      }  
    }
  componentDidUpdate(){
    this.state.books.map( (book) => {
       this.state.homeBooks.map( (homeBook) => {
       if(book.id === homeBook.id){
           book['shelf'] = homeBook.shelf         
         } else if(!book.hasOwnProperty('shelf')){
           book.shelf = 'none'
         }
       })                   
     })       
   }


  render(){
    const {query, books} = this.state
    return(    
      <div className="search-books">
          <div className="search-books-bar">
            <Link to={'/'} className="close-search"> Close</Link>
            <form className="search-books-input-wrapper">                      
              <input
               type="text"
               placeholder="Search by title or author"
               value= {query}
               onChange= {this.queryHandler}                         
              />                      
            </form>
          </div>
                
          <div className="search-books-results"> 
              <ol className="books-grid">
                 {books && this.state.books.map( (book) => ( 
                   <Book key={book.id} book={book} shelf = {this.state.shelf}
                    updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}  />                             
                  ))
                 }
              </ol>                                                                                                                   
          </div>					                               				      
      </div>                    
          )
       }
    }


export default AddBook
