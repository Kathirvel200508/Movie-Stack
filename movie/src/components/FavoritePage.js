import './FavoritePage.css'
function FavoritePage({favmovies, toggleFavorites}) {
    return (
        <>
        <h1>Favorites</h1>
{       
        favmovies.length === 0 ? (<p>no favorites yet...</p>) : (
        favmovies.map((movie, index) => (
        <div className="Favorites" key = {index}>
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '200px', borderRadius: '8px' }}/>   
        <button onClick={() => toggleFavorites(movie)}>Remove from Favorites 💔</button>
        {movie.adult ? (<p>18+</p>) : (<p>All Ages</p>)}   
        {movie.vote_average === 0 ? (<p>Movie Unrated</p>) : (<p>{Math.round(movie.vote_average * 10)/ 10} / 10</p>)}
        </div>)

))}
        </>
    );
}
export default FavoritePage;