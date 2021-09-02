import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId.id));
    };
    const handleToggleBookmark = (userId) => {
        const newUsers = [...users];
        const elementIndex = newUsers.findIndex((item) => item._id === userId);
        if (newUsers[elementIndex].favorite) {
            newUsers[elementIndex].favorite = false;
        } else {
            newUsers[elementIndex].favorite = true;
        }
        setUsers(newUsers);
    };
    return (
        <>
            <SearchStatus numberUsers={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
            />
        </>
    );
};

export default App;
