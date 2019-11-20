import { advancedSearch, genres } from '../api/Netflix';

export const getNetflix = async (searchTerm, genre) => {
  const currentYear = new Date().getFullYear();
  let sort = 'Rating';
  if (!genre.length) {
    genre = '0';
    sort = 'Relevance';
  }

  const response = await advancedSearch
    .get('', {
      params: {
        q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!${genre}-!Any-!Any-!Any-!gt0-!{downloadable}`,
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: sort,
        p: '1',
        sa: 'or'
      }
    })
    .catch(function(error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
  return response.data.ITEMS;
};

export const getGenres = async () => {
  const response = await genres
    .get('', {
      params: {
        t: 'genres'
      }
    })
    .catch(function(error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });

  return response.data.ITEMS;
};

export const getMovieDetails = async ID => {
  const response = await advancedSearch
    .get('', {
      params: {
        t: 'loadvideo',
        q: ID
      }
    })
    .catch(function(error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });

  return response.data.RESULT;
};
