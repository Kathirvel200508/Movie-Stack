import {useState} from 'react';
function SearchBar({movies}) {
    const [name, setName] = useState("");
    const [result, setResult] = useState(null);
    const handleInput = () => {
        for(var i = 0; i < movies.length; i++) {
            if(movies[i].title.trim().toLowerCase() === name) {
                setResult(
                <div className="element">
                <h1>{movies[i].title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${movies[i].poster_path}`} alt={movies[i].title} style={{ width: '200px', borderRadius: '8px' }}/>
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