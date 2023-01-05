     const {query, books} = this.state
      const showingResults = query === ''
           ? '' : books.filter( (book) => {
                 return book.title.includes(query) ||  book.authors.includes(query)
           }) 



           	books.map( (book) => {
            if (book.shelf === 'currentlyReading'){           
             this.setState( (prevState) => ({ 
             	 currentlyReading : prevState.currentlyReading.concat(book)
              }))
            }
       		 else if (book.shelf === 'wantToRead'){            
             this.setState( (prevState) => ({ 
             	 wantToRead : prevState.wantToRead.concat(book)
              }))
            }
        	else{         
              this.setState( (prevState) => ({ 
                   read: prevState.read.concat(book)
               }))
             }    	       
         })