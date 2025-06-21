import './App.css';
import { useState, useEffect } from 'react';
import MovieCard from './components/movieCard';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import FavoritePage from './components/FavoritePage';
import Navbar from './components/Navbar';
import WatchLater from './components/WatchLater';
import SearchBar from './components/SearchBar';

function App() {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [watchLater, setWatch] = useState([]);

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

const removeFromWatchList = (movieID) => {
  setWatch(watchLater.filter(movie => movie.id !== movieID));
}
  return (
    <>
    <Router>
  <nav>
    <Navbar/>
    <div className="navlink">
    <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link> | <Link to="/Search">Search</Link> | <Link to="/WatchLater">Watch Later</Link>
    </div>
  </nav>

  <Routes>
    <Route
      path="/"
      element={
        <MovieCard
          movies={movies}
          favorites={fav}
          watchLater = {watchLater}
          toggleWatchList={toggleWatchList}
          toggleFavorite={toggleFavorite}
        />
      }
    />
    <Route
      path="/favorites"
      element={ 
        <FavoritePage
          favmovies={fav}
        />
      }
    />
    <Route 
    path="/Search"
    element={
      <SearchBar movies={movies}/>
    }/>
    <Route  
    path="/WatchLater"
    element={
      <WatchLater watchLater={watchLater} toggleWatchList={toggleWatchList} removeFromWatchList={removeFromWatchList}/>
      
    }/>
  </Routes>
</Router>

    </> );
}

export default App;
