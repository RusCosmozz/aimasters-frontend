import React, {FC, PropsWithChildren} from 'react';
import AuthorizationRouting from "./AuthorizationRouting";
import {USER_TOKEN_NAME} from "../constants/tokenKey";

const AuthorizationGate: FC<PropsWithChildren> = ({ children }) => {
    const token = localStorage.getItem(USER_TOKEN_NAME);

    if (!token) {
        return <AuthorizationRouting />;
    }

    return <>{children}</>;
}

export default AuthorizationGate;
