import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UsersTable from "./usersTable";
import Search from "./search";

const Users = () => {
    const pageSize = 8;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [users, setUsers] = useState();
    const [searchUsers, setSearchUsers] = useState(null);

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
        if (newUsers[elementIndex].bookmark) {
            newUsers[elementIndex].bookmark = false;
        } else {
            newUsers[elementIndex].bookmark = true;
        }
        setUsers(newUsers);
    };
    const resetSearch = () => {
        setSearchUsers(null);
    };
    const handleProfessionSale = item => {
        resetSearch();
        setSelectedProf(item);
    };
    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = item => {
        setSortBy(item);
    };
    useEffect(() => {
        api.professions.fetchAll().then(data => {
            setProfessions(data);
        });
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUsers]);
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSearch = ({ target }) => {
        if (selectedProf) {
            clearFilter();
        }
        const foundUsers = users.filter(user =>
            user.name.includes(target.value)
        );
        setSearchUsers(foundUsers);
    };

    if (users) {
        const isSearch = searchUsers !== null;
        const filteredUsers =
            (selectedProf &&
                users.filter(user =>
                    _.isEqual(user.profession, selectedProf)
                )) ||
            (isSearch && searchUsers) ||
            users;

        const count = filteredUsers.length;
        const sortedUser = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUser, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSale}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Clear filter
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus numberUsers={count} />
                    <Search onSearch={handleSearch} />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
Users.propTypes = {
    users: PropTypes.array
};
export default Users;
