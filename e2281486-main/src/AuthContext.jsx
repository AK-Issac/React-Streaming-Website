
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        }
    }, []);

    const saveAuthToken = (token) => {
        sessionStorage.setItem("authToken", token);
        setAuthToken(token);
    };

    const clearAuthToken = () => {
        sessionStorage.removeItem("authToken");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{
            authToken,
            isAuthenticated: !!authToken,
            setAuthToken: saveAuthToken,
            clearAuthToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
