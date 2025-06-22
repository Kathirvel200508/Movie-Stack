import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ movies, genres, favmovies, watchLater, toggleFavorite, toggleWatchList }) {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [genreResults, setGenreResults] = useState([]);

  const handleInput = () => {
    const movie = movies.find(
      (m) => m.title.trim().toLowerCase() === name.toLowerCase().trim()
    );

    if (movie) {
      const isFav = favmovies.some((m) => m.id === movie.id);
      const isWatch = watchLater.some((m) => m.id === movie.id);

      setResult(
        <div className="container">
          <div className="element">
            <h1>{movie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', borderRadius: '8px' }}
            />
            <p>{movie.adult ? "18+" : "All Ages"}</p>
            <p>
              {movie.vote_average === 0
                ? "Movie Unrated"
                : `${Math.round(movie.vote_average * 10) / 10} / 10`}
            </p>
            <p>
              Genres:{" "}
              {movie.genre_ids.map((id) => genres?.[id]).filter(Boolean).join(", ")}
            </p>
            <button className="favo-btn" onClick={() => toggleFavorite(movie)}>
              {isFav ? '💔 Remove Favorite' : '❤️ Add Favorite'}
            </button>
            <button className="watch-btn" onClick={() => toggleWatchList(movie)}>
              {isWatch ? '❌ Remove Watch Later' : '📺 Add Watch Later'}
            </button>
          </div>
        </div>
      );
      setGenreResults([]);
    } else {
      setResult(<p>No results found.</p>);
      setGenreResults([]);
    }
  };

  const handleGenreSearch = (genreName) => {
    if (!genreName) {
      setGenreResults([]);
      return;
    }

    const genreID = Object.entries(genres || {}).find(
      ([_, name]) => name.toLowerCase() === genreName.toLowerCase()
    )?.[0];

    if (!genreID) {
      setGenreResults([]);
      return;
    }

    const filtered = movies.filter((movie) =>
      movie.genre_ids.includes(parseInt(genreID))
    );

    setGenreResults(filtered);
    setResult(null);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Enter movie name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="search-btn" onClick={handleInput}>Search</button>

      <select className="dropdown-menu" onChange={(e) => handleGenreSearch(e.target.value)}>
        <option value="">Search By Genre</option>
        {Object.entries(genres || {}).map(([id, name]) => (
          <option key={id} value={name}>{name}</option>
        ))}
      </select>

      {result}

      <div className="genre-results">
        {genreResults.length > 0 &&
          genreResults.map((movie) => {
            const isFav = favmovies.some((m) => m.id === movie.id);
            const isWatch = watchLater.some((m) => m.id === movie.id);

            return (
              <div key={`${movie.id}-${movie.title}`} className="cards">
                <h2>{movie.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ borderRadius: '6px' }}
                />
                <p>
                  Genres:{" "}
                  {movie.genre_ids.map((id) => genres?.[id]).filter(Boolean).join(", ")}
                </p>
                <button onClick={() => toggleFavorite(movie)}>
                  {isFav ? '💔 Remove Favorite' : '❤️ Add Favorite'}
                </button>
                <button onClick={() => toggleWatchList(movie)}>
                  {isWatch ? '❌ Remove Watch Later' : '📺 Add Watch Later'}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
