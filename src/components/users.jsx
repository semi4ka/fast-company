import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);

  const handleDelete = userId => {
    console.log(userId);
    setUsers(users.filter(user => user._id != userId.id));
  };
  const renderPhrase = number => {
    if (number === 0)
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    return (
      <>
        <span className="badge bg-primary">
          {number} человек{number <= 4 && number != 1 ? "a" : ""} тусанет с
          тобой сегодня
        </span>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map(item => (
                    <span
                      key={item.color}
                      className={"me-2 badge bg-" + item.color}
                    >
                      {item.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete({ id: user._id });
                    }}
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  return <>{renderPhrase(users.length)}</>;
};

export default Users;
