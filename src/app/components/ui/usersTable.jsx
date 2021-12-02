import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => <a href={"/users/" + user._id}>{user.name}</a>
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: { path: "completedMeetings", name: "Профессия" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    userId={user._id}
                    isFavorite={user.bookmark ? user.bookmark : false}
                    onToggleBookmark={onToggleBookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => {
                        onDelete({ id: user._id });
                    }}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UsersTable;
