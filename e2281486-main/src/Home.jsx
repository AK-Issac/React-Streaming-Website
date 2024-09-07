import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
    const [tvShows, setTvShows] = useState([]);
    const [filter, setFilter] = useState("");
    const [studios, setStudios] = useState([]);
    const [selectedStudio, setSelectedStudio] = useState("");
    const [taillePage, setTaillePage] = useState(8);
    const [pageCourante, setPageCourante] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const tvShowsResponse = await fetch("https://tvshowdbapi.herokuapp.com/tvshows");
                const studiosResponse = await fetch("https://tvshowdbapi.herokuapp.com/studios");
                if (!tvShowsResponse.ok || !studiosResponse.ok) throw new Error("Network response was not ok");

                const tvShowsData = await tvShowsResponse.json();
                const studiosData = await studiosResponse.json();

                setTvShows(tvShowsData);
                setStudios(studiosData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        setPageCourante(1);
    }, [filter, selectedStudio, taillePage]);

    const filteredTvShows = tvShows.filter(show =>
        show.title.toLowerCase().includes(filter.toLowerCase()) &&
        (!selectedStudio || show.studio.name === selectedStudio)
    );

    function nbPages() {
        return Math.ceil(filteredTvShows.length / taillePage);
    }

    function paginer() {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return filteredTvShows.slice(debut, fin);
    }

    function tableauPages() {
        let p = [];
        for (let i = 1; i <= nbPages(); i++) {
            p.push(i);
        }
        return p;
    }

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} has-text-centered`}>TP2 Attention il y a des erreurs parfois alors raffraichir la page parfois pour que history fontionne</h1>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Filter by title..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <select value={selectedStudio} onChange={(e) => setSelectedStudio(e.target.value)}>
                    <option value="">Select a Studio</option>
                    {studios.map((studio) => (
                        <option key={studio.id} value={studio.name}>
                            {studio.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="columns is-multiline is-mobile">
                {paginer().map((show) => (
                    <Link key={show.tvshowId} to={`/detail/${show.tvshowId}`} className="column is-3-desktop is-4-tablet is-6-mobile">
                        <div className="card large">
                            <div className="card-image">
                                <figure className="image is-square">
                                    <img src={show.imgURL} alt={show.title} />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4 no-padding">{show.title}</p>
                                        <p className="subtitle is-6">{show.studio.name}</p>
                                        <p className="subtitle is-6">{show.genres.map(genre => genre.name).join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <footer>
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <button className="pagination-previous"
                        onClick={() => setPageCourante(Math.max(pageCourante - 1, 1))}>
                        Précédent
                    </button>
                    <button className="pagination-next"
                        onClick={() => setPageCourante(Math.min(pageCourante + 1, nbPages()))}>
                        Suivant
                    </button>
                    <ul className="pagination-list">
                        {tableauPages().map((numPage) => (
                            <li key={numPage}>
                                <button
                                    className={`pagination-link ${pageCourante === numPage ? "is-current" : ""}`}
                                    aria-label={`Page ${numPage}`}
                                    onClick={() => setPageCourante(numPage)}>
                                    {numPage}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <select value={taillePage} onChange={(e) => setTaillePage(Number(e.target.value))}>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                    </select>
                </nav>
            </footer>
        </div>
    );
}

export { Home };
