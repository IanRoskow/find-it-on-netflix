import axios from 'axios';

export const advancedSearch = axios.create({
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
  },
  baseURL: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi'
});

export const genres = axios.create({
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
  },
  baseURL: 'https://unogs-unogs-v1.p.rapidapi.com/api.cgi'
});
