import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import Swal from "sweetalert2";
import "./Login.css";
import { UserPropType } from "../../types/books/user.type";
import { useAuth } from "../../context/UserContext";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset,} = useForm<UserPropType>();
    const {onLogin, authState: { authenticated }} = useAuth();

    // const mySwal = Swal;
    const navigate = useNavigate();
    useEffect(() => {
        if (authenticated) {
            navigate("/books");
        }
    }, [ authenticated]);

    // function handleError(message: string) {
    //     return mySwal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: message.replace(/<[^>]*>/g, ""),
    //         confirmButtonColor: "#000",
    //         confirmButtonText: "Okay!",
    //     });
    // }


    async function onSubmit(data: UserPropType) {
        try {
            const email_or_username = data.inputValue ?? "";
            const password = data.password ?? "";

            const loginInput = (email_or_username) ? { email: email_or_username, password } : { username: email_or_username, password };
            await onLogin(loginInput.email ?? loginInput.username, password);
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
                            <div className="form-header"></div>
                            <div className="form-body">
                                <input
                                    className="form-input"
                                    type="text"
                                    placeholder="E.g., username"
                                    {...register("inputValue", { required: true })}
                                />
                                {errors.inputValue && (
                                    <span
                                        style={{
                                            color: "red",
                                            padding: "22px 0",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        This field is required
                                    </span>
                                )}

                                <input
                                    className="form-input"
                                    type="pass"
                                    placeholder="E.g., •••••••••••••"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span
                                        style={{
                                            color: "red",
                                            padding: "22px 0",
                                            fontWeight: "bold",
                                        }}
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
        </>
    );
};

export default Login;
