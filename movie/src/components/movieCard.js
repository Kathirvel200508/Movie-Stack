
function MovieCard({ movies, favorites, watchLater, toggleWatchList, toggleFavorite }) {
  return (
    <>
      {movies.map((movie, index) => {
        const isFav = favorites.some((favMovie) => favMovie.id === movie.id);
        return (
          <div className="card" key={index}>
            <h1>{movie.title}</h1>
            <button onClick={() => toggleFavorite(movie)}>
              {isFav ? '💔 Remove' : '❤️ Add'}
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', borderRadius: '8px' }}
            />
            {movie.adult ? <p>18+</p> : <p>All Ages</p>}
            <p>{movie.vote_average} / 10</p>
          </div>
        );
      })}
    </>
  );
}

export default MovieCard;
