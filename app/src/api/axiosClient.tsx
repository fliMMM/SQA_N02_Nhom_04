import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:5555/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  }
}) 

export default axiosClient;