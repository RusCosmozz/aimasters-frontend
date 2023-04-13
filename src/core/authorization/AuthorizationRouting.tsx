import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import {Routes as AppRoutes} from "../constants/routes";

interface AuthorizationMapperType {
    path: string;
    element: JSX.Element;
}

const authorizationMapper: AuthorizationMapperType[] = [
    { path: AppRoutes.HOME, element: <LoginPage /> },
    { path: AppRoutes.LOGIN, element: <LoginPage /> },
    { path: AppRoutes.REGISTER, element: <RegisterPage /> }
];

const AuthorizationRouting = () => {
    const routes = authorizationMapper.map((route, idx) =>
        <Route
            key={`authorization-route-${idx}`}
            path={route.path}
            element={route.element}
        />
    );

    return (
        <BrowserRouter>
            <Routes>
                {routes}
            </Routes>
        </BrowserRouter>
    );
};

export default AuthorizationRouting;