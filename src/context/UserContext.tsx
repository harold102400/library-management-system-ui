import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { registerUser } from "../services/apiFunctions";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_API_URL


export type UserContextValue = {
    onLogin: (username: string, password: string) => Promise<void>;
    onLogout: () => void;
    registerNewUser: (username: string, email: string, password: string) => Promise<void>;
    authState: {
        token: string | null;
        authenticated: boolean | null;
    };
};


export const UserContext = createContext<UserContextValue>({
    onLogin: async () => { },
    onLogout: () => { },
    registerNewUser: async() => { },
    authState: {
        token: null,
        authenticated: null,
    },
});

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [authState, setAuthState] = useState<UserContextValue["authState"]>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = () => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                });
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                });
            }
        };
        loadToken();
    }, []);

    const login = async (username: string, password: string): Promise<void> => {
        const { data: response } = await axios.post(`${API_URL}/auth`, {
            username: username,
            password: password,
        });

        console.log(response);

        setAuthState({
            token: response.token,
            authenticated: true,
        });

        axios.defaults.headers.post["Authorization"] = `Bearer ${response.token}`;
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem("userDisplayName", response.display_name);

        return response;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        axios.defaults.headers.common["Authorization"] = "";
        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const registerNewUser = async (username: string, email: string, password: string): Promise<void> => {
        await registerUser(username, email, password);
    }

    const value: UserContextValue = {
        onLogin: login,
        onLogout: logout,
        registerNewUser,
        authState
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default UserContext;
