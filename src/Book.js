import React from 'react';
import PropTypes from 'prop-types'


class Book extends React.Component{
render(){
  const { book } = this.props
   return(  
     <div>
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                 {book.hasOwnProperty('imageLinks.thumbnail') || book.hasOwnProperty('imageLinks')?( 
                     <div className="book-cover"					
                        style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`}}>            
                    </div>)  : ''                     
                      }
                      <form className="book-shelf-changer">
                         <select                        
                          value={book.shelf}
                          onChange={this.props.updateBookShelf}
                          >
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                         </select>
                     </form>                    
                </div>
                <div className="book-title">{book.title}</div>                 
                  { book.hasOwnProperty('authors') && book.authors.length > 1?(   
                     <div className="book-authors">
                       {book.authors.join(', ') }
                     </div> ) : ( <div className="book-authors"> {book.authors} </div> )                                           
                       }
                </div>
           </li>
     </div>
    )
  }
}


Book.propTypes = {
  book: PropTypes.object.isRequired,
}


export default Book