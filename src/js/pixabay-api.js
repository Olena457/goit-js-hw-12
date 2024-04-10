import axios from 'axios';
export async function fetchImages(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const KEY = '43261756-f7e91f342fa994673ba6d269c';

  const OTHERS_PARAMS = `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const response = await axios.get(`${BASE_URL}${OTHERS_PARAMS}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
