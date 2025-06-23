export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const api = axios.create({
  baseURL: 'http://localhost:5050/api/v1',
  withCredentials: false, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

  const data = await response.json();
  
  if (!api.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
};