import React from "react";
import { useParams } from "react-router-dom";
import UserPage, { EditUserPage } from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    if (edit) {
        return <EditUserPage userId={userId} />;
    }
    return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>;
};

export default Users;
