import React, {useState} from 'react';

import Form from "../components/Form/Form";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import {AuthorizationRedirectStyled, AuthorizationWrapperStyled} from "./AuthorizationStyled";
import {Link, useNavigate} from "react-router-dom";
import {Routes} from "../constants/routes";
import {loginUser} from "./api";
import {useDispatch} from "react-redux";
import {setUser, UserStateType} from "../modules/user/slice/userSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        const loginResponse = await loginUser(email, password) as UserStateType;

        dispatch(setUser(loginResponse));
        navigate(Routes.LOBBIES);
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
                <Link to={Routes.REGISTER}>register</Link>
            </AuthorizationRedirectStyled>
        </AuthorizationWrapperStyled>
    );
}

export default LoginPage;