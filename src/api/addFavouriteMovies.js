const API_URL = 'http://localhost:4000';

export const addFavouritesMovies = async (list) => {
  try {
    const response = await fetch(`${API_URL}/favourites/Movies`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al agregar la lista a favoritos');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
