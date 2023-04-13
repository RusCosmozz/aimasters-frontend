import React, {useState} from 'react';

import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import {AuthorizationRedirectStyled, AuthorizationWrapperStyled} from "./AuthorizationStyled";
import {Link} from "react-router-dom";
import {AuthorizationRoutesEnum} from "../constants/routes";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // try {
        //     const requestBody = JSON.stringify({
        //         "email": email,
        //         "password": password,
        //     });
        //     console.log("Request body:", requestBody);
        //     const response = await fetch('http://localhost:8086/api/users/login', {
        //
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: requestBody,
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Authentication failed');
        //     }
        //     const data = await response.json();
            // Update your application state with the authenticated user data, e.g., save the access token
            // Navigate to the lobbies page
            // setUser({ id: data.id, username: data.username});
            // navigate('/lobbies');
        // } catch (error) {
        //     // Handle errors, e.g., show an error message to the user
        //     console.error('Error during authentication:', error);
        // }
    }

    return (
        <AuthorizationWrapperStyled>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="username"
                    placeholder="Username"
                    value={email}
                    onChange={handleEmailChange}
                    autoFocus
                    required
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <Button type="submit">
                    Login
                </Button>
            </Form>

            <AuthorizationRedirectStyled>
                <Link to={AuthorizationRoutesEnum.REGISTER}>register</Link>
            </AuthorizationRedirectStyled>
        </AuthorizationWrapperStyled>
    );
}

export default LoginPage;