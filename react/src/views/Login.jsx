import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const {setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(payload)
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="title">Login into your account</h1>
            {message && (
                <div className="alert">
                    <p>{message}</p>
                </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button type="submit" className="btn btn-block">
                Log In
            </button>
            <p className="message">
                Not yet registered?{" "}
                <Link to="/register">Create an account</Link>
            </p>
        </form>
    );
};

export default Login;
