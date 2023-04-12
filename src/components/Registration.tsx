import { css } from '@emotion/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const inputStyle = css`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
  background-color: #333;
  border: none;
  border-radius: 3px;
  color: #fff;
`;

const buttonStyle = css`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  background-color: #5c6bc0;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3f51b5;
  }
`;

const Registration = () => {
    const navigate = useNavigate();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Replace the URL with your backend API endpoint
            const response = await fetch('http://localhost:8086/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const data = await response.json();
            // Update your application state, e.g., show a success message or navigate to the login page
            navigate('/login');
        } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.error('Error during registration:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} css={formStyle}>
            <input
                type="text"
                placeholder="Username"
                css={inputStyle}
                value={username}
                onChange={handleNameChange}
                required
            />
            <input
                type="email"
                placeholder="Email"
                css={inputStyle}
                value={email}
                onChange={handleEmailChange}
                required
            />
            <input
                type="password"
                placeholder="Password"
                css={inputStyle}
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <button type="submit" css={buttonStyle}>
                Register
            </button>
        </form>
    );
};

export default Registration;
