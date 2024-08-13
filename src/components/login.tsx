import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // check if the user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/to-do', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login button clicked'); // just debugging

    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data received:', data);

      const users = data.users;
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        // saving login status in local storage
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/to-do', { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="circle"></div>
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
        {error && <p className="error">{error}</p>}
        <p>
          By continuing, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
        </p>
        <div className="links">
          <a href="#">Forget your password</a>
        </div>
      </form>
      <div className="create-account">
        <a href="#">Create an account</a>
      </div>
    </div>
  );
};

export default Login;
