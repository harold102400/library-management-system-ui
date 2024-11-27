import App from "./App";
import { UserProvider } from "./context/UserContext";
import { AppRouter } from "./router/routerconfig/AppRouter";

export const AppContainer = () => {
    return (
        <UserProvider>
            <AppRouter>
                <App />
            </AppRouter>
        </UserProvider>
    );
};
