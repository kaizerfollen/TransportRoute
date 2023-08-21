import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_DATA_URL,
  params: {
    key: process.env.VUE_APP_DATA_KEY,
  },
});

export default instance;
