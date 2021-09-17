import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then(data => {
            setUsers(data);
        });
    }, []);

    const handleDelete = userId => {
        setUsers(users.filter(user => user._id !== userId.id));
    };
    const handleToggleBookmark = userId => {
        const newUsers = [...users];
        const elementIndex = newUsers.findIndex(item => item._id === userId);
        if (newUsers[elementIndex].favorite) {
            newUsers[elementIndex].favorite = false;
        } else {
            newUsers[elementIndex].favorite = true;
        }
        setUsers(newUsers);
    };
    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
            />
        </>
    );
};

export default App;
