import React from "react";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";
import Quality from "./quality";

const User = ({ user, onDelete, onToggleBookmark }) => {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map(item => (
                        <Quality key={item._id} {...item} />
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <Bookmark
                        userId={user._id}
                        isFavorite={user.favorite ? user.favorite : false}
                        onToggleBookmark={onToggleBookmark}
                    />
                </td>
                <td>
                    <button
                        onClick={() => {
                            onDelete({ id: user._id });
                        }}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    user: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default User;
