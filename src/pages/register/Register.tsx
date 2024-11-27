import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputValueProp } from "../../types/books/user.type";
import { useAuth } from "../../context/UserContext";
// import './Register.css';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<InputValueProp>();
    const { registerNewUser } = useAuth();

    const navigate = useNavigate();
    async function onSubmit(data: InputValueProp) {
        try {
            await registerNewUser(data.username, data.email, data.password);
            reset();
            navigate('/login');
        } catch (error: any) {
            console.log(error?.response?.data?.message);
            console.error(error?.response?.data?.message)
            // handleError(error?.response.data?.message);
        }
    }
    return (
        <>
            <div className="container-login">
                <div className="form-container">
                    <div className="container">
                        <form onSubmit={handleSubmit(onSubmit)} className="form">
                            <div className="form-header">
                                <div className="form-title">Register</div>
                            </div>
                            <div className="form-body">
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="E.g., username"
                                    {...register("username", { required: true })}
                                />
                                {errors.username && (
                                    <span
                                    className="span-error-message"
                                    >
                                        This field is required
                                    </span>
                                )}

                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="E.g., email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <span
                                    className="span-error-message"
                                    >
                                        This field is required
                                    </span>
                                )}

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
