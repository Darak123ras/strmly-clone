import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, error } = await signup(name, email, password);
      if (success) {
        navigate('/feed');
      } else {
        setError(error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };


  return (
    <div className="signup">
      <div className="auth-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength="6"
            required
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
