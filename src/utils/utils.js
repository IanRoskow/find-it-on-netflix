import Netflix from '../api/Netflix';

export const getNetflix = async (searchTerm, genre) => {
  console.log(searchTerm);
  console.log(genre);
  const currentYear = new Date().getFullYear();
  let sort = 'Rating';
  if (!genre.length) {
    genre = '0';
    sort = 'Relevance';
  }

  const response = await Netflix.get('', {
    params: {
      q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!${genre}-!Any-!Any-!Any-!gt0-!{downloadable}`,
      t: 'ns',
      cl: 'all',
      st: 'adv',
      ob: sort,
      p: '1',
      sa: 'or'
    }
  });
  console.log(response.data.ITEMS);
  return response.data.ITEMS;
};

export const getGenres = async () => {
  const response = await Netflix.get('', {
    params: {
      t: 'genres'
    }
  });

  return response.data.ITEMS;
};
