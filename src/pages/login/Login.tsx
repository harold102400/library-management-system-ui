import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Login.css";
import { UserPropType } from "../../types/books/user.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Login = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<UserPropType>();
    const {onLogin, authState: { authenticated }} = useAuth();
    const [loadingData, setLoadingData] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            if (authenticated) {
                navigate("/books");
            }
     }, 2000)
       
    }, [ navigate, authenticated]);

    async function onSubmit(data: UserPropType) {
        try {
            setLoadingData(true);
            const email_or_username = data.inputValue ?? "";
            const password = data.password ?? "";

            const loginInput = (email_or_username) ? { email: email_or_username, password } : { username: email_or_username, password };
            await onLogin(loginInput.email ?? loginInput.username, password);
        } catch (error: any) {
            console.log(error?.response?.data?.message)
            handlError(error?.response?.data?.message);
        }
        finally{
            setTimeout(() => {
                setLoadingData(false);
            }, 5000)
        }
    }
    return loadingData ? (
        <LoadingSpinner />
    ) : (
        <div className="container-login">
                <div className="form-container">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            <div className="form-header">
                                <div className="form-title">Log in</div>
                                <p className="new-account-text">Need an account? <a href="/register" className="new-link-text">Create an account</a></p>
                            </div>
                            <div className="form-body">
                                <label htmlFor="username" className="form-label">Username or email</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="E.g., username or email"
                                    {...register("inputValue", { required: true })}
                                />
                                {errors.inputValue && (
                                    <span
                                        className="span-error-message"
                                    >
                                        This field is required
                                    </span>
                                )}

                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="E.g., •••••••••••••"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span
                                    className="span-error-message"
                                    >
                                        This field is required
                                    </span>
                                )}

                                <button type="submit" className="form-cta">
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )
};

export default Login;
