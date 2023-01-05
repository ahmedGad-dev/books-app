updateBookShelf = () => {   
 		this.state.books.map( (book) => { 
        if (this.state.shelf === 'currentlyReading'){
             BooksAPI.update(book.id, 'currentlyReading' )
             this.setState( () => ({ 
             	shelf: 'currentlyReading'
             }))
          }
        else if (this.state.shelf === 'wantToRead'){
             BooksAPI.update(book.id, 'wantToRead' )
             this.setState( () => ({ 
             	shelf: 'wantToRead'
             }))
           }
        else{
             BooksAPI.update(book.id, 'read' ) 
             this.setState( () => ({ 
             	shelf: 'read' 
             }))
           }    	       
        })
      }  


books.map( (book) => {       
          if(book.shelf === 'currentlyReading'){           
             BooksAPI.update( book.id, 'currentlyReading' )
          }else if (book.shelf === 'wantToRead'){                   
             BooksAPI.update( book.id,'wantToRead' )
          }else if (book.shelf === 'read'){ 
             BooksAPI.update( book.id, 'read' )
           }else if (book.shelf === ''){
             BooksAPI.update( book.id, 'none' )
           } 	       
         }) 


           {this.state.homeBooks && this.state.homeBooks.map( (book) => ( 
                   <Book key={book.id} book={this.state.homeBook} shelf={book.shelf} />                             
                  ))
                 }


                   
    componentDidMount(){
      BooksAPI.getAll().then( (books) =>{
        this.setState({
          homeBooks: books
        })
       })
     }




         this.state.homeBooks.map( (book) => {
        if(this.state.query === book.name || this.state.query === book.authors ){
          this.setState({
            homeBook: book 
          })
        }
      })










           componentDidUpdate(){
           BooksAPI.getAll().then( (homeBooks) => {
             this.setState({
               homeBooks 
             })
           })
           this.state.books.filter( (book) => {
         	 this.state.homeBooks.filter( (homeBook) => {              
                 if(book.id === homeBook.id){
                  	 book['shelf'] = homeBook.shelf 
                 }
                 else if(!book.id.hasOwnProperty('shelf') && book.id != homeBook.id){
                  	 book['shelf'] = 'none' 
                 }
              })                   
            })                       
        }





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
     bookShelf :  ''
  }
  

   componentDidMount(){
     BooksAPI.getAll().then((books) =>{
       this.setState({
         books
       })
    	books.map( (book) => {
       if (book.shelf === 'currentlyReading'){           
        this.setState( (prevState) => ({ 
        	 currentlyReading : prevState.currentlyReading.concat(book),
         }))
       }
   	 else if (book.shelf === 'wantToRead'){            
        this.setState( (prevState) => ({ 
        	 wantToRead : prevState.wantToRead.concat(book),
         }))
       }
    else if (book.shelf === 'read'){         
         this.setState( (prevState) => ({ 
            read: prevState.read.concat(book),
             }))
            }  
         })
      })     
    }

    updateBookShelf = (book, newShelf) =>{     
         book.shelf = newShelf             
        return BooksAPI.update(book, newShelf).then(
                  this.setState({
                    bookShelf: newShelf
                  })
         )                    
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
                  {this.state.currentlyReading.map( (book) =>(
                    <Book key={book.id} book = {book} shelf = {this.state.bookShelf}
                    updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
                   ))
                 }
                </Shelf>
                         			
                <Shelf title='Want To Read'>
                  {this.state.wantToRead.map( (book) =>(
                    <Book key={book.id} book = {book} shelf = {this.state.bookShelf}
                    updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
                  ))
                }
                </Shelf>

                <Shelf title='read'>
                  {this.state.read.map( (book) =>(
                    <Book key={book.id} book = {book} shelf = {this.state.bookShelf}
                    updateBookShelf={ (event) => this.updateBookShelf(book, event.target.value)}/>
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



