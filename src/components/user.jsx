import React from "react";
import Qualitie from "./qualitie";
import Bookmarck from "./bookmarck";

const User = ({ user, onDelete, onToggleBookmark }) => {
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(item => (
            <Qualitie key={item._id} {...item} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td>
          <Bookmarck
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

export default User;
