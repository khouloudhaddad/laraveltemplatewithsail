import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const onDelete = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${user.id}`).then(() => {
            //to do show notifications
            setNotification("User was deleted successfully");
            getUsers();
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">USERS</h1>
                <Link
                    to="/users/new"
                    className="px-3 py-3 bg-green-500 hover:bg-green-600 transition-colors text-white rounded"
                >
                    Add new
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading == true ? (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading ...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>

                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={"/users/" + user.id}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) => onDelete(user)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Users;
