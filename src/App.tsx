import React from 'react';
import { Provider } from "react-redux";

import AuthorizationGate from "./core/authorization/AuthorizationGate";
import {AppWrapperStyled} from "./core/components/AppWrapper/AppWrapper";

import { store } from "./core/store"

const App = () => {
    return (
        <Provider store={store}>
            <AppWrapperStyled>
                <AuthorizationGate>

                </AuthorizationGate>
            </AppWrapperStyled>
        </Provider>
    );
}

export default App;

