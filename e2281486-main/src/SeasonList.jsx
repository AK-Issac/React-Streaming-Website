function Season({ season }) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-square">
                    <img src={season.imgURL} alt={`Season ${season.number}`} />
                </figure>
            </div>
            <div className="card-content">
                <p className="title is-4">Season {season.number}</p>
                <p className="subtitle is-6">{season.episodeCount} episodes</p>
            </div>
        </div>
    );
}

export default Season;
