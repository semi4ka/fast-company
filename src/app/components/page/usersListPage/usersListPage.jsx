import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import Search from "../../ui/search";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const currentUserId = useSelector(getCurrentUserId());
    const pageSize = 8;
    const professions = useSelector(getProfessions());
    const profLoading = useSelector(getProfLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const users = useSelector(getUsersList());
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (userId) => {
        console.log(userId);
    };
    const handleToggleBookmark = (userId) => {
        const newUsers = [...users];
        const elementIndex = newUsers.findIndex((item) => item._id === userId);
        if (newUsers[elementIndex].bookmark) {
            newUsers[elementIndex].bookmark = false;
        } else {
            newUsers[elementIndex].bookmark = true;
        }
        console.log(newUsers);
    };
    const resetSearch = () => {
        setSearchQuery("");
    };
    const handleProfessionSale = (item) => {
        resetSearch();
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSearch = ({ target }) => {
        if (selectedProf) {
            clearFilter();
        }
        setSearchQuery(target.value);
    };
    if (users) {
        // const isSearch = searchQuery !== null;
        // const filteredUsers =
        //     (selectedProf &&
        //         users.filter((user) =>
        //             _.isEqual(user.profession, selectedProf)
        //         )) ||
        //     (isSearch &&
        //         users.filter((user) =>
        //             user.name.toLowerCase().includes(searchQuery.toLowerCase())
        //         )) ||
        //     users;

        function filterUsers(data) {
            const filteredUsers = searchQuery
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                  )
                : selectedProf
                ? data.filter((user) =>
                      _.isEqual(user.profession, selectedProf)
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUserId._id);
        }
        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUser = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUser, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && !profLoading && (
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
                    <Search onSearch={handleSearch} value={searchQuery} />
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
UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
