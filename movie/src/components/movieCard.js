import './movieCard.css';

function MovieCard({ movies, favorites, watchLater, toggleWatchList, toggleFavorite }) {
  return (
    <>
      {movies.map((movie, index) => {
        const isFav = favorites.some((favMovie) => favMovie.id === movie.id);
        const isWatchLater = watchLater.some((watchLaterMovie) => watchLaterMovie.id === movie.id);

        return (
          <div className="card" key={index}>
            <h1>{movie.title}</h1>

            <button className="fav-btn" onClick={() => toggleFavorite(movie)}>
              {isFav ? '💔 Remove' : '❤️ Add'}
            </button>

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            {movie.adult ? <p>18+</p> : <p>All Ages</p>}
            <p>
              {movie.vote_average === 0
                ? 'Movie Unrated'
                : `${Math.round(movie.vote_average * 10) / 10} / 10`}
            </p>

            <button className="watch-later" onClick={() => toggleWatchList(movie)}>
              {isWatchLater ? '❌ Remove Watch Later' : '📺 Add Watch Later'}
            </button>
          </div>
        );
      })}
    </>
  );
}

export default MovieCard;
