const API_URL = 'http://localhost:4000';

export const allFavorites = async () => {
  try {
    const response = await fetch(`${API_URL}/favorites`);

    if (!response.ok) {
      throw new Error('Error al obtener los favoritos');
    }

    const favorites = await response.json();
    return favorites;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
