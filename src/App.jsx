import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import FilterBar from './components/FilterBar';

const BOOK_SEARCH_API = import.meta.env.VITE_BOOK_SEARCH_API;
//const SEARCH_INSIDE_API = import.meta.env.VITE_SEARCH_INSIDE_API;
const BOOK_COVERS = import.meta.env.VITE_BOOK_COVERS_API;
const AUTHOR_IMAGES = import.meta.env.VITE_AUTHOR_PHOTOS_API;

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minEditionCount, setMinEditionCount] = useState(1);
  const [filter, setFilter] = useState('All');


  const handleSearch = async (query) => {
    try {
      setSearchQuery(query); //updating the state
      const res = await fetch(`${BOOK_SEARCH_API}?q=${query}`);
      const data = await res.json();
      setBooks(data.docs);
      console.log(data)
    } catch (err) {
      console.error("Failed to fetch books", err)
    }
  }
  useEffect(() => { //this is the initial load for mounting
    handleSearch('')
  }, [])

  const filteredBooks = books.filter(book => {
    const title = book.title || '';
    const author = book.author_name?.join(', ') || '';
    const editionCount = book.edition_count || 0;

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEditionCount = (minEditionCount === 0 || editionCount >= minEditionCount);

    return matchesSearch && matchesEditionCount;
  });

  const numUniqueAuthors = () => {
    const authorSet = new Set();
    filteredBooks.forEach(book => {
      if (book.author_name) {
        book.author_name.forEach(name => authorSet.add(name));
      }
    });
    return authorSet.size;
  }

  const avgEditionNum = () => {
    let numEditions = 0;
    filteredBooks.forEach(book => {
      numEditions = numEditions + book.edition_count
    })
    let avg_editions = (numEditions === 0 ? 0 : Math.floor(numEditions / filteredBooks.length))
    return avg_editions;
  }

  return (
    <>
      <div>
        <h1>Book Directory</h1>
      </div>
      <div className='search-filter-bar'>
        <div className='search-bar'>
          <h2>Search here: </h2>
          <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={handleSearch} />
        </div>
        <div className='filter-bar'>
          <FilterBar selectedCount={minEditionCount} onChange={setMinEditionCount} />
        </div>
      </div>
      <h2 className='summary-section-h2'>Summary Stats</h2>
      <section className='summary-section'>
        <div className='num-of-authors'>
          <p>Number of authors: {numUniqueAuthors()}</p>
        </div>
        <div className='num-of-books'>
          <p>Number of books: {filteredBooks.length}</p>
        </div>
        <div className='average-edition-count'>
          <p>Averge # of Editions: {avgEditionNum()}</p>
        </div>
      </section>
      <h2 className='results-h2'>Results</h2>
      <div className='book-results'>
        {filteredBooks.map((book, index) => (
          <div className='book-card' key={index}>
            <BookCard className='book-card' key={index} work={book}
              bookTitle={book.title}
              author={book.author_name ? book.author_name.join(', ') : 'Unknown'}
              author_image={`${AUTHOR_IMAGES}${book.author_key[0]}-M.jpg`}
              //placeholder for book subject
              editionCount={book.edition_count}
              yearPublished={book.first_publish_year}
              //readLevel='Advanced'
              isAvailable={book.has_fulltext ? 'Yes' : 'No'}
              book_image={`${BOOK_COVERS}${book.cover_i}-M.jpg`} />
          </div>
        ))}

      </div>
    </>

  )
}
export default App
