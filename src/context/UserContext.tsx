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
    onLogin: (input: string, password: string) => Promise<void>;
    onLogout: () => void;
    registerNewUser: (username: string, email: string, password: string) => Promise<void>;
    authState: {
        token: string | null;
        authenticated: boolean | null;
        user_id: string | null;
        username: string | null;
    };
};


export const UserContext = createContext<UserContextValue>({
    onLogin: async () => { },
    onLogout: () => { },
    registerNewUser: async() => { },
    authState: {
        token: null,
        authenticated: null,
        user_id: null,
        username: null,
    },
});

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [authState, setAuthState] = useState<UserContextValue["authState"]>({
        token: null,
        authenticated: null,
        user_id: null,
        username: null,
    });

    useEffect(() => {
        const loadToken = () => {
            const token = localStorage.getItem(TOKEN_KEY);
            const user_id = localStorage.getItem("user_id");
            const username = localStorage.getItem("userDisplayName");
            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                    user_id,
                    username,
                });
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } else {
                setAuthState({
                    token: null,
                    authenticated: false,
                    user_id: null,
                    username: null,
                });
            }
        };
        loadToken();
    }, []);

    const login = async (input: string, password: string): Promise<void> => {

        const isEmail = /\S+@\S+\.\S+/.test(input);

        const loginData = isEmail ? { email: input, password } : { username: input, password }

        const { data: response } = await axios.post(`${API_URL}/auth`, loginData);

        console.log(response);

        setAuthState({
            token: response.token,
            authenticated: true,
            user_id: response.user_id,
            username: response.display_name,
        });

        axios.defaults.headers.post["Authorization"] = `Bearer ${response.token}`;
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem("user_id", response.user_id);
        localStorage.setItem("userDisplayName", response.display_name);

        return response;
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("user_id");
        localStorage.removeItem("userDisplayName");
        axios.defaults.headers.common["Authorization"] = "";
        setAuthState({
            token: null,
            authenticated: false,
            user_id: null,
            username: null,
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
