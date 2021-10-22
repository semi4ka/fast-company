import React from "react";
import PropTypes from "prop-types";
const Quality = ({ color, name }) => {
    return (
        <>
            <span key={color} className={"me-2 badge bg-" + color}>
                {name}
            </span>
        </>
    );
};
Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
export default Quality;
