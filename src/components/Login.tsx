import {css} from '@emotion/react';
import {useState} from "react";
import React, { useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useUser } from './UserContext';


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



const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const requestBody = JSON.stringify({
                "email": email,
                "password": password,
            });
            console.log("Request body:", requestBody);
            const response = await fetch('http://localhost:8086/api/users/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }
            const data = await response.json();
            // Update your application state with the authenticated user data, e.g., save the access token
            // Navigate to the lobbies page
            setUser({ id: data.id, username: data.username});
            navigate('/lobbies');
        } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.error('Error during authentication:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} css={formStyle}>
            <input type="username"
                   placeholder="username"
                   value={email}
                   onChange={handleEmailChange}
                   css={inputStyle}
                   required/>
            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={handlePasswordChange}
                   css={inputStyle} required/>
            <button type="submit" css={buttonStyle}>Login</button>
        </form>
    );
};

export default Login;
