import { Link } from "react-router-dom";

const Login = () => {
    const handleSubmit = () => {};

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="title">Login into your account</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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
