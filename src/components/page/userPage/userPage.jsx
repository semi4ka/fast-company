import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserInfo from "./userInfo";
import CommentBox from "./conmmentBox";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(data);
        });
        api.users.fetchAll().then(data => {
            const usersName = data.map(user => ({
                name: user.name,
                value: user._id
            }));
            setUsers(usersName);
        });
    }, []);

    // const handleBack = () => {
    //     history.push("/users");
    // };

    if (user && users) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserInfo user={user} />
                    </div>
                    <div className="col-md-8">
                        <CommentBox userId={userId} users={users} />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};
UserPage.propTypes = {
    userId: PropTypes.string
};
export default UserPage;
