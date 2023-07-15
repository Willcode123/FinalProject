import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movieReviews.css';
import './Home.css'; // Importa el estilo de Home.css

const MovieReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [userReview, setUserReview] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [addedToReviews, setAddedToReviews] = useState(false); // Nuevo estado para indicar que se agregó una reseña

  useEffect(() => {
    const storedReviews = localStorage.getItem('movieReviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=d10a77f1`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = (rating) => {
    setUserReview(rating);
  };

  const handleAddReview = () => {
    if (selectedMovie && userReview > 0 && userComment !== '') {
      const newReview = {
        movie: selectedMovie,
        rating: userReview,
        comment: userComment,
      };
      setReviews([...reviews, newReview]);
      setSelectedMovie(null);
      setUserReview(0);
      setUserComment('');

      localStorage.setItem('movieReviews', JSON.stringify([...reviews, newReview]));
      setAddedToReviews(true); // Actualiza el estado para indicar que se agregó una reseña
    }
  };

  return (
    <div className="container"> {/* Reemplaza "movie-reviews-container" por "container" */}
      <h1>Movie Reviews App</h1>
      <h2>once selected, scroll down to the bottom of the page to add your review</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <h2>Search Results:</h2>
      <ul className="movie-container"> {/* Reemplaza "movie-list" por "movie-container" */}
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card"> {/* Reemplaza "li" por "div" */}
            <h3 className="movie-title">{movie.Title}</h3>
            <button className="movie-button" onClick={() => setSelectedMovie(movie)}>Select</button>
            {movie.Poster && <img className="movie-image" src={movie.Poster} alt={movie.Title} />}
          </div>
        ))}
      </ul>
      {selectedMovie && (
        <div className="selected-movie-container">
          <h2>Selected Movie: {selectedMovie.Title}</h2>
          <h3>Add Review:</h3>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span
                key={rating}
                onClick={() => handleReview(rating)}
                style={{
                  cursor: 'pointer',
                  color: userReview >= rating ? 'Blue' : 'gray',
                  marginRight: '5px',
                }}
              >
                {rating}
              </span>
            ))}
          </div>
          <h4>Rating: {userReview}</h4>
          <textarea
            rows={4}
            cols={50}
            placeholder="Write your comment here..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <button className="add-review-button" onClick={handleAddReview}>Add Review</button>
        </div>
      )}
      <h2 className="favourites-heading">User Reviews:</h2> {/* Agrega la clase "favourites-heading" */}
      <div className="favourites-container"> {/* Agrega la clase "favourites-container" */}
        {reviews.map((review, index) => (
          <div key={index} className="favourite-card"> {/* Reemplaza "li" por "div" y agrega la clase "favourite-card" */}
            <h3>{review.movie.Title}</h3>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
      {addedToReviews && <p>Review added!</p>} {/* Muestra el mensaje "Review added!" si se agregó una reseña */}
    </div>
  );
};

export default MovieReviews;
