import React, {useState} from 'react';

import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

import {AuthorizationRedirectStyled, AuthorizationWrapperStyled} from "./AuthorizationStyled";
import {Link, useNavigate} from "react-router-dom";
import {Routes} from "../constants/routes";
import {registerUser} from "./api";


const RegisterPage = () => {
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

        const registerResponse = await registerUser(username, email, password);

        navigate(Routes.LOGIN);
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
                <Link to={Routes.LOGIN}>login</Link>
            </AuthorizationRedirectStyled>
        </AuthorizationWrapperStyled>
    );
};

export default  RegisterPage;