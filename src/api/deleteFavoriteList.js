const API_URL = 'http://localhost:4000';

export const deleteFavoriteList = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la lista de favoritos');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
