import { useState } from 'react';
import LoginPage from './Login';
import SignupPage from './Signup';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='auth-form'>
    <div className="auth-form-container">
      {isLogin ? (
        <LoginPage />
      ) : (
        <SignupPage />
      )}
      
      <div className="auth-toggle">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Sign up</button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Login</button>
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AuthForm;