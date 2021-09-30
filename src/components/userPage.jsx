import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../api";
import Quality from "./quality";

const UserPage = () => {
    const history = useHistory();
    const [user, setUser] = useState();
    const params = useParams();
    const { userId } = params;

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

export default UserPage;
