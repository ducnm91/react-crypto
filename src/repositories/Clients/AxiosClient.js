import axios from 'axios';

const baseDomain = 'https://api.binance.com/api/v3';
const baseURL = `${baseDomain}`; // Incase of /api/v1;

// ALL DEFUALT CONFIGURATION HERE

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    // "Authorization": "Bearer xxxxx"
  },
});
