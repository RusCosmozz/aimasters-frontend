import React, {useState} from 'react';

import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import {AuthorizationRedirectStyled, AuthorizationWrapperStyled} from "./AuthorizationStyled";
import {Link} from "react-router-dom";
import {AuthorizationRoutesEnum} from "../constants/routes";


const RegisterPage = () => {
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
        // try {
        //     // Replace the URL with your backend API endpoint
        //     const response = await fetch('http://localhost:8086/api/users/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ username, email, password }),
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Registration failed');
        //     }
        //     const data = await response.json();
        //     // Update your application state, e.g., show a success message or navigate to the login page
        //     navigate('/login');
        // } catch (error) {
        //     // Handle errors, e.g., show an error message to the user
        //     console.error('Error during registration:', error);
        // }
    };

    return (
        <AuthorizationWrapperStyled>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleNameChange}
                    required
                />

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
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
                    Register
                </Button>
            </Form>

            <AuthorizationRedirectStyled>
                <Link to={AuthorizationRoutesEnum.LOGIN}>login</Link>
            </AuthorizationRedirectStyled>
        </AuthorizationWrapperStyled>
    );
};

export default  RegisterPage;