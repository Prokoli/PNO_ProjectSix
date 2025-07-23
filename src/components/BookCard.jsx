import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"



function BookCard({ bookTitle, author, editionCount, readLevel, isAvailable, book_image, author_image, yearPublished, work }) {

    const workKey = work.key.replace("/works/", ""); // safely extract the ID
    return (
        <>
            <Link
                style={{ color: "White" }}
                to={`/bookDetails/${workKey}`}
                key={workKey}
            >
                <h3>{bookTitle}</h3>
                <p>Author: {author}</p>
            </Link>
            <img src={author_image} />
            <p>Year Published: {yearPublished}</p>
            <p>Edition Count: {editionCount}</p>
            <p>Available? {isAvailable}</p>
            <img src={book_image} />

        </>
    )
}
export default BookCard