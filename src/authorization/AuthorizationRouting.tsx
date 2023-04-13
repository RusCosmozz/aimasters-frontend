import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import {AuthorizationRoutesEnum} from "../constants/routes";

interface AuthorizationMapperType {
    path: string;
    element: JSX.Element;
}

const authorizationMapper: AuthorizationMapperType[] = [
    { path: AuthorizationRoutesEnum.HOME, element: <LoginPage /> },
    { path: AuthorizationRoutesEnum.LOGIN, element: <RegisterPage /> },
    { path: AuthorizationRoutesEnum.REGISTER, element: <RegisterPage /> }
];

const AuthorizationRouting = () => {
    const routes = authorizationMapper.map(route => <Route path={route.path} element={route.element} />);

    return (
        <BrowserRouter>
            <Routes>
                {routes}
            </Routes>
        </BrowserRouter>
    );
};

export default AuthorizationRouting;