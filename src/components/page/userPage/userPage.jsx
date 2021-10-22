import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Quality from "../../ui/qualities/quality";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(data);
        });
    });
    const handleBack = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div className="container">
                <h1>{user.name}</h1>
                <h2>{user.profession.name}</h2>
                {user.qualities.map(quality => (
                    <Quality
                        key={quality._id}
                        color={quality.color}
                        name={quality.name}
                    />
                ))}
                <p>Completed meetings: {user.completedMeetings}</p>
                <p>Rate: {user.rate}</p>
                <button onClick={handleBack} className="btn btn-primary">
                    All users
                </button>
            </div>
        );
    }
    return "Loading...";
};
UserPage.propTypes = {
    userId: PropTypes.string
};
export default UserPage;
