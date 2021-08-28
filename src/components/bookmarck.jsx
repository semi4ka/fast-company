import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
const Bookmarck = ({ onToggleBookmark, userId, isFavorite }) => {
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

export default Bookmarck;
