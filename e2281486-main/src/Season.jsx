import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Episode from "./Episode";
import JouerEpisode from "./JouerEpisode";
import { useHistory } from "./HistoryContext"; 
import "./styles.css"; 

function Season() {
    const { seasonId } = useParams();
    const [seasonData, setSeasonData] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
    const { history } = useHistory();
    const episodesPerPage = 8;

    useEffect(() => {
        async function fetchSeasonData() {
            try {
                const response = await fetch(`https://tvshowdbapi.herokuapp.com/episodes?seasonId=${seasonId}`);
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                setSeasonData({
                    tvshowTitle: data.tvshowTitle,
                    seasonNumber: data.seasonNumber,
                });
                setEpisodes(data.episodes);
            } catch (error) {
                console.error("Failed to fetch season data:", error);
            }
        }

        fetchSeasonData();
    }, [seasonId]);

    if (!seasonData) {
        return <div>Problème avec la page...</div>;
    }

    const totalPages = Math.ceil(episodes.length / episodesPerPage);
    const paginatedEpisodes = episodes.slice((currentPage - 1) * episodesPerPage, currentPage * episodesPerPage);

    const isEpisodeWatched = (episodeId) => {
        return history.some((item) => item.episodeId === episodeId);
    };

    if (selectedEpisodeId !== null) {
        return <JouerEpisode episodeId={selectedEpisodeId} onBack={() => setSelectedEpisodeId(null)} />;
    }

    return (
        <>
            <div>
                <h1>{seasonData.tvshowTitle}</h1>
                <h2>Season {seasonData.seasonNumber}</h2>
            </div>
            <div className="columns is-multiline">
                {paginatedEpisodes.map((episode) => (
                    <div
                        key={episode.episodeId}
                        className={`column is-3-desktop is-4-tablet is-6-mobile ${isEpisodeWatched(episode.episodeId) ? "watched-episode" : ""}`}
                        onClick={() => setSelectedEpisodeId(episode.episodeId)}
                    >
                        <Episode episode={episode} />
                    </div>
                ))}
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
                    <button
                        className="pagination-next"
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </button>
                    <ul className="pagination-list">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <li key={page}>
                                <button
                                    className={`pagination-link ${currentPage === page ? "is-current" : ""}`}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </footer>
        </>
    );
}

export default Season;
