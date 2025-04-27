import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { registerUser } from "../services/apiFunctions";
import { API_URL } from "../config/config";
import api from "../api/api";


export type UserContextValue = {
    onLogin: (input: string, password: string) => Promise<void>;
    onLogout: () => Promise<void>;
    registerNewUser: (username: string, email: string, password: string) => Promise<void>;
    authState: { authenticated: boolean | null };
};


export const UserContext = createContext<UserContextValue>({
    onLogin: async () => { },
    onLogout: async () => { },
    registerNewUser: async() => { },
    authState: {authenticated: null}
});

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [authState, setAuthState] = useState<UserContextValue["authState"]>({authenticated: null});

    useEffect(() => {
      setInterval(() => {
        const fetchUser = async () => {
          await api.get(`${API_URL}/auth/checksession`);
        };
        fetchUser();
      }, 3600000);
    }, []);


    const login = async (input: string, password: string): Promise<void> => {
        const isEmail = /\S+@\S+\.\S+/.test(input);

        const loginData = isEmail ? { email: input, password } : { username: input, password }

        await api.post(`${API_URL}/auth`, loginData);

        setAuthState({authenticated: true});
    };

    const logout = async () => {
        setAuthState({authenticated: false});
        await api.get(`${API_URL}/auth/endsession`);
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
