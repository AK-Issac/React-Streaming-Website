import { useState, useEffect } from "react";

function JouerEpisode({ episodeId, onBack }) {
    const [episodeData, setEpisodeData] = useState(null);
    const [error, setError] = useState(null);
    const authToken = sessionStorage.getItem("authToken");

    useEffect(() => {
        if (!authToken) {
            setError("Vous devez être authentifié pour accéder au visionnement.");
            return;
        }

        async function fetchEpisodeData() {
            try {
                const response = await fetch(`https://tvshowdbapi.herokuapp.com/viewepisode?episodeId=${episodeId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                setEpisodeData(data);
            } catch (error) {
                console.error("Failed to fetch episode data:", error);
                setError("Problème avec la récupération de l'épisode.");
            }
        }

        fetchEpisodeData();
    }, [episodeId, authToken]);

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!episodeData) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <button onClick={onBack}>Retour</button>
            <h1>Episode {episodeData.episodeId}</h1>
            <video controls src={episodeData.videoURL} width="100%">
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default JouerEpisode;
