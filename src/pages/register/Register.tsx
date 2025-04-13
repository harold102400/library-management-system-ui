import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { InputValueProp } from "../../types/books/user.type";
import { useAuth } from "../../context/UserContext";
import { handlError } from "../../components/ErrorAlert/ErrorAlert";
import { FaArrowLeft } from "react-icons/fa";
import './Register.css';
import { handleApiError } from "../../utils/handleApiErrors";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<InputValueProp>();
    const { registerNewUser } = useAuth();

    const navigate = useNavigate();
    async function onSubmit(data: InputValueProp) {
        try {
            await registerNewUser(data.username, data.email, data.password);
            reset();
            navigate('/login');
        } catch (error: unknown) {
            const errorMessage = handleApiError(error)
            handlError(errorMessage)
        }
    }
    return (
        <>
            <div className="register-container-login">
                <div className="form-register-container">
                    <div className="register-container">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-register">
                            <div className="form-register-header">
                                <Link to="/login"
                                className="back-Link"
                            >
                                <FaArrowLeft className="back-icon" />
                                </Link>
                                <div className="form-register-title">Register</div>
                            </div>
                            <div className="form-register-body">
                                <input
                                    className="form-register-input"
                                    type="text"
                                    placeholder="E.g., username"
                                    {...register("username", { 
                                        required:  "This field is required and cannot be empty",
                                        setValueAs: (value) => value.trim(),
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                                            message: "Title must contain only letters and spaces",
                                          },
                                    })}
                                />
                                {errors.username && (
                                    <span
                                    className="span-error-message"
                                    >
                                        {errors.username.message}
                                    </span>
                                )}

                                <input
                                    className="form-register-input"
                                    type="text"
                                    placeholder="E.g., email"
                                    {...register("email", { 
                                        required:  "This field is required and cannot be empty",
                                        setValueAs: (value) => value.trim(),
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s.@]+$/,
                                            message: "Title must contain only letters and spaces",
                                          }, 
                                    })}
                                />
                                {errors.email && (
                                    <span
                                    className="span-error-message"
                                    >
                                        {errors.email?.message}
                                    </span>
                                )}

                                <input
                                    className="form-register-input"
                                    type="password"
                                    placeholder="E.g., •••••••••••••"
                                    {...register("password", { 
                                        required:  "This field is required and cannot be empty",
                                        setValueAs: (value) => value.trim(),
                                        pattern: {
                                            value: /^[A-Za-zÀ-ÿ0-9\s.]+$/,
                                            message: "Title must contain only letters and spaces",
                                          },
                                    })}
                                />
                                {errors.password && (
                                    <span
                                    className="span-error-message"
                                    >
                                        {errors.password.message}
                                    </span>
                                )}

                                <button type="submit" className="form-cta">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
