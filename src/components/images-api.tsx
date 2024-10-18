import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchImages = async (query, page) => {
  const res = await axios.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'landscape',
      lang: 'uk',
    },
    headers: {
      Authorization: `Client-ID R9ZNkzoaWiEmqK_UJ4D-R7zsyjpHU-CPriQACS24Jwg`,
    },
  });

  return {
    totalPages: res.data.total_pages,
    results: res.data.results,
  };
};