import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import Actor from "./Actor"; 
import Season from "./SeasonList"; 

function Detail() {
    const params = useParams();
    const [tvShow, setTvShow] = useState(null);

    useEffect(() => {
        async function fetchTvShow() {
            try {
                const response = await fetch(`https://tvshowdbapi.herokuapp.com/tvshow?tvshowId=${params.tvshowId}`);

                if (!response.ok) throw new Error("Network response was not ok");

                const tvShowData = await response.json();
                setTvShow(tvShowData);
                
            } catch (error) {
                console.error("Failed to fetch TV show data:", error);
            }
        }

        fetchTvShow();
    }, [params.tvshowId]);

    if (!tvShow) {
        return <div>Problème avec la page...</div>;
    }

    return (
        <>
            <div className="columns is-mobile is-multiline">
                <div className="column is-4">
                    <img src={tvShow.imgURL} alt={`Image de ${tvShow.title}`} />
                </div>
                <div className="column is-8">
                    <div className="columns is-mobile is-multiline">
                        <div className="column is-12">
                            <h1 className="title is-2">{tvShow.title}</h1>
                        </div>
                        <div className="column is-12">
                            <span>{tvShow.year}</span>
                        </div>
                        <div className="column is-2">
                            <span>{tvShow.episodeCount} épisodes</span>
                        </div>
                        <div className="column is-2">
                            <span>{tvShow.tvParentalGuideline}</span>
                        </div>
                        
                        
                        <div className="column is-8 has-text-right">
                            <span>
                                {tvShow.genres.map((genre) => genre.name).join(", ")}
                            </span>
                        </div>
                        <div className="column is-12">
                            <span>Studio {tvShow.studio.name}</span>
                        </div>
                        <div className="column is-12 has-text-justified">
                            <span style={{ marginRight: "2.5%" }}>{tvShow.plot}</span>
                        </div>
                        <div className="column is-12">
                            <audio controls src={tvShow.audioURL} autoPlay>
                                <source type="audio/ogg" />
                                Votre navigateur ne prend pas en charge l'élément audio.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="is-2 title">Artistes</h2>
            <div className="columns is-mobile" style={{ overflowX: "auto" }}>
                {tvShow.roles.map((role) => (
                    <Actor key={role.roleId} role={role} />
                ))}
            </div>

            <h2 className="is-2 title">Saisons</h2>
            <div className="columns is-mobile" style={{ overflowX: "auto" }}>
                {tvShow.seasons.map((season) => (
                    <Link key={season.seasonId} to={`/season/${season.seasonId}`} className="column is-narrow" aria-label={`Saison ${season.seasonNumber}`}>
                        <Season season={season} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Detail;
