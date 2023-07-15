const API_URL = 'http://localhost:4000';

export const getFavoriteList = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/lists/${listId}`);

    if (!response.ok) {
      throw new Error('Error al obtener la lista de favoritos');
    }

    const list = await response.json();
    return list;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
