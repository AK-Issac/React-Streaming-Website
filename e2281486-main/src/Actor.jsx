function Actor({ role }) {
    return (
        <div className="column is-2" role="listitem">
            <img src={role.imgURL} alt={role.name} aria-describedby={`${role.character}-description`} />
            <div className="actor-info">
                <h3 id={`${role.character}-description`}>{role.character}</h3>
                <p>{role.name}</p>
            </div>
        </div>
    );
}

export default Actor;
