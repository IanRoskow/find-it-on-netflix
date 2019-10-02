import axios from 'axios';

export default axios.create({
  headers: {
    'content-type': 'application/octet-stream',
    'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
    'x-rapidapi-key': '0dccc9baa3msh43a7da6ec957a6ap101f0ajsn519fcd31e245'
  },
  baseURL: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi'
});
