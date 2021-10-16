import React from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={onSearch}
            />
        </div>
    );
};
Search.propTypes = {
    onSearch: PropTypes.func
};
export default Search;
