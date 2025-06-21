import './WatchLater.css';
function WatchLater({watchLater =[], toggleWatchList, removeFromWatchList}) {

    return (
        <>
            <div className="display-watch-later">
            <h1>Watch Later List</h1>

  {
    watchLater.length === 0 ? (
      <p>No movies in your Watch Later list.</p>
    ) : (
        
      watchLater.map((movie, index) => (
        <div className="watch" key={index}>
          <h3>{movie.title}</h3>
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            style={{ width: '200px', borderRadius: '8px' }} 
          />
          <p>{movie.adult ? '18+' : 'All Ages'}</p>
          <p>{movie.vote_average === 0 ? 'Movie Unrated' : `${Math.round(movie.vote_average * 10) / 10} / 10`}</p>
          <button onClick={() => removeFromWatchList(movie.id)}>Remove from Watch List</button>
        </div>
      ))
    )
  }
</div>

        </>
    )
}
export default WatchLater;