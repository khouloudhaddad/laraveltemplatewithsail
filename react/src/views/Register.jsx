import { Link } from "react-router-dom";
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="title">Create an account</h1>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Password Confirmation" />
            <button type="submit" className="btn btn-block">
                Signup
            </button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default Register;
