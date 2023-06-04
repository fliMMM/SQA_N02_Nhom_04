import axios from 'axios';

// const devBaseUrl = "http://localhost:5555/api/v1/";
const prodBaseUrl = "https://sore-teal-kangaroo-slip.cyclic.app/api/v1/";


const axiosClient = axios.create({
  baseURL: prodBaseUrl,
  timeout:10000,
  headers: {
    'Content-Type': 'application/json',
  }
}) 

export default axiosClient;