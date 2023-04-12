import React, { createContext, useContext, useState } from 'react';

interface User {
    id: string;
    username: string
}

interface UserContextData {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextData | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
