import App from "./App";
import { LibraryProvider } from "./context/LibraryContext";
import { UserProvider } from "./context/UserContext";
import { AppRouter } from "./router/routerconfig/AppRouter";

export const AppContainer = () => {
    return (
        <UserProvider>
            <LibraryProvider>
                <AppRouter>
                    <App />
                </AppRouter>
            </LibraryProvider>
        </UserProvider>
    );
};
