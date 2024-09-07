function Episode({ episode }) {
    return (
        <div className="card">
            <div className="card-content">
                <img src={episode.imgURL} alt={episode.title} />
                <p className="title is-4">{episode.title}</p>
                <p className="subtitle is-6">{episode.number}</p>
                <p>{episode.plot}</p>
            </div>
        </div>
    );
}

export default Episode;
