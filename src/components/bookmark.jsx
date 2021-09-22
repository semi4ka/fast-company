import React from "react";
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
const Bookmark = ({ onToggleBookmark, userId, isFavorite }) => {
    return (
        <a
            href="/"
            onClick={e => {
                e.preventDefault();
                onToggleBookmark(userId);
            }}
        >
            <i className={"bi bi-heart" + (isFavorite ? "-fill" : "")}></i>
        </a>
    );
};
Bookmark.propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};
export default Bookmark;
