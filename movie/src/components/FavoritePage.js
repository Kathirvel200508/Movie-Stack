
function FavoritePage({favmovies}) {
    return (
        <>
        <h1>Favorites</h1>
{       
        favmovies.length === 0 ? (<p>no favorites yet...</p>) : (
        favmovies.map((movie, index) => (
        <div className="Favorites" key = {index}>
        <h3>{movie.title}</h3>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px', borderRadius: '8px' }}/>   
        {movie.adult ? (<p>18+</p>) : (<p>All Ages</p>)}   
        <p>{movie.vote_average} / 10</p>
        </div>)

))}
        </>
    );
}
export default FavoritePage;