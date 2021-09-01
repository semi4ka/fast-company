import React from "react";
import User from "./user";
import Pagination from "./pagination";

const Users = ({ users, onDelete, onToggleBookmark }) => {
  const count = users.length;
  const pageSize = 4;
  const handlePageChange = pageIndex => {
    console.log(pageIndex);
  };
  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <User
                key={user._id}
                user={user}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
