import App from "./App";
import { UserProvider } from "./context/UserContext";

export const AppContainer = () => {
    return (
        <UserProvider>
            <App />
        </UserProvider>
    );
};
