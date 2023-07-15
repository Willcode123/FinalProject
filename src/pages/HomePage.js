import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; 

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  useEffect(() => {
    // Cargar los favoritos desde el almacenamiento local (local storage) al cargar la página
    const storedFavourites = localStorage.getItem('favourites');
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=d10a77f1`);
      const data = response.data;
      if (data && data.Search && data.Search.length > 0) {
        setMovie(data.Search);
      } else {
        setMovie(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavourites = (result) => {
    const isMovieInFavourites = favourites.some((fav) => fav.imdbID === result.imdbID);
    if (!isMovieInFavourites) {
      setFavourites([...favourites, result]);
      setAddedToFavorites(true);
      console.log('Movie added to favourites:', result);

      // Guardar en el almacenamiento local (local storage)
      const updatedFavourites = [...favourites, result];
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    } else {
      console.log('The movie is already in favourites:', result);
    }
  };

  const handleRemoveFromFavourites = (imdbID) => {
    const updatedFavourites = favourites.filter((fav) => fav.imdbID !== imdbID);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {movie && (
        <div className="movie-container">
          {movie.map((result) => (
            <div key={result.imdbID} className="movie-card">
              <h2>{result.Title}</h2>
              <p>{result.Year}</p>
              <img src={result.Poster} alt={result.Title} />
              <button onClick={() => handleAddToFavourites(result)}>Add to Favourites</button>
            </div>
          ))}
        </div>
      )}
      {addedToFavorites && <p>Movie added to favorites!</p>}
      {favourites.length > 0 && (
        <div className="favourites-container">
          <h2>Favourites</h2>
          {favourites.map((fav) => (
            <div key={fav.imdbID} className="favourite-card">
              <h3>{fav.Title}</h3>
              <p>{fav.Year}</p>
              <img src={fav.Poster} alt={fav.Title} />
              <button onClick={() => handleRemoveFromFavourites(fav.imdbID)}>Remove from Favourites</button>
            </div>
          ))}
       </div>
      )}
    </div>
  );
};

export default HomePage;
