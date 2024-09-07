import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "./HistoryContext"; 

function History() {
    const { history } = useHistory(); 
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [pageSize, setPageSize] = useState(6); 
    const errorMessageRef = useRef(null);

 
    const paginate = (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };

    useEffect(() => {
        if (errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, []);

    const totalPages = Math.ceil(history.length / pageSize);

    return (
        <div role="region" aria-label="History">
            <h2 className="title is-2 has-text-centered">History</h2>
            <div>
                <div className="columns is-multiline is-mobile" role="list">
                    {paginate(history, pageSize, currentPage).map((item, index) => (
                        <div key={index} className="column is-4-tablet is-4-mobile is-4-desktop" role="listitem">
                            <Link to={`/jouer/${item.episodeId}`} aria-label={`Details of ${item.tvshowTitle} - Season ${item.seasonNumber} - Episode ${item.episodeTitle}`}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src={item.imgURL} alt={`${item.tvshowTitle} - Season ${item.seasonNumber} - Episode ${item.episodeTitle}`} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content">
                                                <p className="title is-4 has-text-centered has-text-link" style={{ margin: "5px 0" }}>{item.tvshowTitle}</p>
                                                <p className="subtitle is-6 has-text-centered">Season {item.seasonNumber}</p>
                                                <p className="subtitle is-6 has-text-centered">Episode {item.episodeTitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <button
                        className="pagination-previous"
                        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <ul className="pagination-list">
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page}>
                                <button
                                    className={`pagination-link ${currentPage === page + 1 ? "is-current" : ""}`}
                                    onClick={() => setCurrentPage(page + 1)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="pagination-next"
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                </nav>
            </footer>
        </div>
    );
}

export default History;
