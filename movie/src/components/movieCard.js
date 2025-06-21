import './movieCard.css'

function MovieCard({ movies, favorites, watchLater, toggleWatchList, toggleFavorite }) {
  return (
    <>
      {movies.map((movie, index) => {
        const isFav = favorites.some((favMovie) => favMovie.id === movie.id);
        const isWatchLater = watchLater.some((watchLatermovie) => watchLatermovie.id === movie.id);
        return (
          <div className="card" key={index}>
            <h1>{movie.title}</h1>
            <button className="fav-btn" onClick={() => toggleFavorite(movie)}>
              {isFav ? '💔 Remove' : '❤️ Add'}
            </button>
            
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', borderRadius: '8px' }}
            />
            <p></p>
<button className= "watch-later" onClick={() => toggleWatchList(movie)}>
              {isWatchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
            </button>
            {movie.adult ? <p>18+</p> : <p>All Ages</p>}
            {movie.vote_average === 0 ? (<p>Movie Unrated</p>) : (<p>{Math.round(movie.vote_average * 10)/ 10} / 10</p>)}
          </div>
        );
      })}
    </>
  );
}

export default MovieCard;
