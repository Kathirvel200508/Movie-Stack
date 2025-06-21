import {useState} from 'react';
import './SearchBar.css';
function SearchBar({movies}) {
    const [name, setName] = useState("");
    const [result, setResult] = useState(null);
    const handleInput = () => {
        for(var i = 0; i < movies.length; i++) {
            if(movies[i].title.trim().toLowerCase() === name.toLowerCase().trim()) {
                setResult(
                <div className="container">
                <div className="element">
                <h1>{movies[i].title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${movies[i].poster_path}`} alt={movies[i].title} style={{ width: '200px', borderRadius: '8px' }}/>
                {movies[i].adult ? (<p>18+</p>) : (<p>All Ages</p>)}   
                {movies[i].vote_average === 0 ? (<p>Movie Unrated</p>) : (<p>{Math.round(movies[i].vote_average * 10) / 10} / 10</p>)}
                </div>
                </div>
                );
                return 0;
        }
        else {
            setResult(<p>no results found.</p>);
        }
    }
}
    return (
        <>
        <div className="search-input">
            <input type="text" placeholder="Enter movie name" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <button onClick={handleInput}>Search</button>
            {result}
        </div>
        </>
    )
}

export default SearchBar;