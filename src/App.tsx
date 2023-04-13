import React from 'react';
import AuthorizationGate from "./core/authorization/AuthorizationGate";
import {AppWrapperStyled} from "./core/components/AppWrapper/AppWrapper";

const App = () => {
    return (
        <AppWrapperStyled>
            <AuthorizationGate>

            </AuthorizationGate>
        </AppWrapperStyled>
    );
}

export default App;

