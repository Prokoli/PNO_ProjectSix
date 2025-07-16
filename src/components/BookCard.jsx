function BookCard({ bookTitle, author, editionCount, readLevel, isAvailable, book_image, author_image, yearPublished }) {
    return (
        <>
            <h3>{bookTitle}</h3>
            <p>Author: {author}</p>
            <img src={author_image} />
            <p>Year Published: {yearPublished}</p>
            <p>Edition Count: {editionCount}</p>
            <p>Available? {isAvailable}</p>
            <img src={book_image} />

        </>
    )
}
export default BookCard