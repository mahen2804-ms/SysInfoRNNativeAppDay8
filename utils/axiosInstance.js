import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://737c-2402-8100-386f-6496-9cce-1334-1c2-9aa2.ngrok.io',
  timeout: 3000,
  timeoutErrorMessage: 'Server down.. Please try after sometime.',
});

export default axiosInstance;
