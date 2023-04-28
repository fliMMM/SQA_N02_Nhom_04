import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://sore-teal-kangaroo-slip.cyclic.app/api/v1/",
  timeout:10000,
  headers: {
    'Content-Type': 'application/json',
  }
}) 

export default axiosClient;