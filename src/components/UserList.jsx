import { useEffect, useState } from "react";
import { fetchUsers } from "../services/firestore";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const userData = await fetchUsers();
            setUsers(userData);
        };
        getUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
