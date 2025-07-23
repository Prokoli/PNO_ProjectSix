import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "../routes/NotFound";


//const API_KEY = import.meta.env.VITE_BOOK_SEARCH_API;
const BOOK_COVERS = import.meta.env.VITE_BOOK_COVERS_API;

function BookDetail() {
    const [fullDetails, setFullDetails] = useState([]);
    const [authorName, setAuthorName] = useState("");

    const { workKey } = useParams()
    console.log("workKey:", workKey);
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(
                    `https://openlibrary.org/works/${workKey}.json`
                    //works/${workKey}
                    //work key should be formatted as follows: "/works/*insertkeyhere*"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }
                const data = await response.json();
                setFullDetails(data);

                if (data.authors && data.authors.length > 0) {
                    const authorKey = data.authors[0].author.key; // e.g. "/authors/OL34184A"
                    const authorResponse = await fetch(`https://openlibrary.org${authorKey}.json`);
                    if (authorResponse.ok) {
                        const authorData = await authorResponse.json();
                        setAuthorName(authorData.name);
                    }
                }
            } catch (error) {
                console.error(error);
                setFullDetails(null);
            }
        };

        if (workKey) {
            fetchBookDetails();
        }
    }, [workKey]);

    if (error) {
        return <NotFound />;
    }

    return (
        <>
            {fullDetails ? (
                <div>
                    <h2>{fullDetails.title}</h2>
                    {fullDetails.covers && fullDetails.covers.length > 0 && (
                        <img
                            src={`${BOOK_COVERS}${fullDetails.covers[0]}-L.jpg`}
                            alt={fullDetails.title}
                            style={{ maxWidth: "300px" }}
                        />
                    )}
                    {authorName && (
                        <h3>By: {authorName}</h3>
                    )}
                    <div className="details-book-description">
                        <h4>Description:</h4>
                        <p>
                            {typeof fullDetails.description === "string"
                                ? fullDetails.description
                                : fullDetails.description?.value || "No description available."}
                        </p>
                    </div>
                    {fullDetails.subjects && (
                        <div className="detail-book-subjects">
                            <h4>Subjects:</h4>
                            <ul>
                                {fullDetails.subjects.map((subject, idx) => (
                                    <li key={idx}>{subject}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            ) : (
                <p>Loading book details...</p>
            )}
        </>
    )
}
export default BookDetail;