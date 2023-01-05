import React from 'react';
import './App.css'
import PropTypes from 'prop-types'


const Shelf = ( props )  => { 
        return( 
          <div className="bookshelf">         					                          
            <h2 className="bookshelf-title">{props.title}</h2>              	
            <ol className="Books-list">
					      {props.children}                
				    </ol>
          </div>		         
         	)      
       }

      Shelf.propTypes = {
        title: PropTypes.string.isRequired,
      }

export default Shelf 
