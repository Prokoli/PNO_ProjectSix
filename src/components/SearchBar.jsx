function SearchBar({ query, setQuery, onSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    id='search-bar-id'
                    type="text"
                    placeholder="Search title or author"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='search-button' type='submit'>Search</button>
            </form>
        </>
    )
}
export default SearchBar