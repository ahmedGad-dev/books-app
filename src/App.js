
import React from 'react'
import './App.css'
import {Route, Switch} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import AddBook from './AddBook';
import { Link } from 'react-router-dom';
import Shelf from './Shelf'
import Book from './Book'

class BooksApp extends React.Component {
  
  state = {
     currentlyReading: [],
     wantToRead: [],
     read: [],
     books: [],
  }
  
   componentDidMount(){
     BooksAPI.getAll().then((books) =>{
       this.setState({
         books
       })
     })     
   }

    updateBookShelf = (book, newShelf) =>{                      
         BooksAPI.update(book, newShelf).then(
            this.setState( (prevState) => ({
               books : prevState.books.filter((book) => book.shelf === book.shelf),
            })) 
           )  
           book.shelf = newShelf                    
         }
     
         componentDidUpdate(){
          BooksAPI.getAll().then((books) =>{
            this.setState({
              books
            })
          })     
        }
       
      
  render() { 
    return (
      <div className="app">
      <Switch>
        <Route exact path={'/'} render={() => (
          <div className="list-books">
               <h1 className="list-books-title">MyReads</h1>
             <div className="list-books-content">        
               <Shelf title='Currently Reading'>
                  {this.state.books.map( (book) =>(
                     book.shelf === 'currentlyReading' ?
                      <Book key={book.id} book = {book} 
                      updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
                       : ''              
                    ))
                   }
                </Shelf>
                         			
                <Shelf title='Want To Read'>
                  {this.state.books.map( (book) =>(
                     book.shelf === 'wantToRead' ?
                      <Book key={book.id} book = {book} 
                      updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
                       : ''              
                    ))
                   }
                </Shelf>


                <Shelf title='Read'>
                  {this.state.books.map( (book) =>(
                     book.shelf === 'read' ?
                      <Book key={book.id} book = {book} 
                      updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
                       : ''              
                    ))
                   }
                </Shelf>
             </div>        
             <Link className="open-search" to='/search' title='Add a book'></Link>
          </div>
        )}/>         
          <Route exact path= "/search" component={AddBook} /> 
		      <Route           
            render={() => (
              <div className="page-not-found">
                <h1>404: page not found</h1>
                <Link to="/">Home</Link>
              </div>
            )}
          />
       </Switch>
      </div>
    )
  }
}

export default BooksApp