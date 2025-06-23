import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  
  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5050/api/v1/auth/signup', {
        name,
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      
      const profileResponse = await axios.get('http://localhost:5050/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      setUser(profileResponse.data.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Signup failed' 
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5050/api/v1/auth/login', {
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      
      const profileResponse = await axios.get('http://localhost:5050/api/v1/auth/profile', {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });
      
      setUser(profileResponse.data.data);
      setToken(response.data.token);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token,signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
