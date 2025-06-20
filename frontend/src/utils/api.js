const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://lone-town-f9ih.onrender.com'
  : 'http://localhost:5000';

export default API_BASE_URL; 