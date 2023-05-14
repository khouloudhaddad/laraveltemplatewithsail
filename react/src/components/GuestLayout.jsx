import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <div className="logo">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default GuestLayout;
