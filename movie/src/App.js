import './App.css';
import { useState, useEffect } from 'react';
import MovieCard from './components/movieCard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FavoritePage from './components/FavoritePage';
import Navbar from './components/Navbar';
import WatchLater from './components/WatchLater';
import SearchBar from './components/SearchBar';
import LoginPage from './components/LoginPage';

function App() {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [watchLater, setWatch] = useState([]);
  const [genres, setGenres] = useState({});
  const [user, setUser] = useState(null);

  const toggleFavorite = (movie) => {
    const isAlreadyFav = fav.some((favMovie) => favMovie.id === movie.id);
    if (isAlreadyFav) {
      setFav(fav.filter((favMovie) => favMovie.id !== movie.id));
    } else {
      setFav([...fav, movie]);
    }
  };

  const toggleWatchList = (movie) => {
    const isAlreadyInList = watchLater.some(item => item.id === movie.id);
    if (isAlreadyInList) {
      setWatch(watchLater.filter(item => item.id !== movie.id));
    } else {
      setWatch([...watchLater, movie]);
    }
  };

  const removeFromWatchList = (movieID) => {
    setWatch(watchLater.filter(movie => movie.id !== movieID));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        for (let page = 1; page <= 5; page++) {
          const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`);
          if (!res.ok) throw new Error(`Page ${page} failed`);
          const data = await res.json();
          allMovies = [...allMovies, ...data.results];
        }
        setMovies(allMovies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, [API_KEY]);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setUser} />} />
          <Route path="/signup" element={<LoginPage onLogin={setUser} />} />
          <Route path="*" element={<LoginPage onLogin={setUser} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <nav>
        <Navbar />
        <div className="navlink">
          <Link to="/">Home</Link> |{" "}
          <Link to="/favorites">Favorites</Link> |{" "}
          <Link to="/Search">Search</Link> |{" "}
          <Link to="/WatchLater">Watch Later</Link> |{" "}
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <MovieCard
              movies={movies}
              favorites={fav}
              watchLater={watchLater}
              toggleWatchList={toggleWatchList}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/favorites" element={<FavoritePage favmovies={fav} toggleFavorites={toggleFavorite} />} />
        <Route
          path="/Search"
          element={
            <SearchBar
              movies={movies}
              genres={genres}
              favmovies={fav}
              toggleFavorite={toggleFavorite}
              toggleWatchList={toggleWatchList}
              watchLater={watchLater}
            />
          }
        />
        <Route
          path="/WatchLater"
          element={
            <WatchLater
              watchLater={watchLater}
              toggleWatchList={toggleWatchList}
              removeFromWatchList={removeFromWatchList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
