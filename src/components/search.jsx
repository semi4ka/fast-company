import React from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch, value }) => {
    return (
        <div>
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={value}
                onChange={onSearch}
            />
        </div>
    );
};
Search.propTypes = {
    onSearch: PropTypes.func,
    value: PropTypes.string
};
export default Search;
