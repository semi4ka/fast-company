import React from "react";
import PropTypes from "prop-types";
const Quality = ({ _id, color, name }) => {
    return (
        <>
            <span key={_id} className={"me-2 badge bg-" + color}>
                {name}
            </span>
        </>
    );
};
Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};
export default Quality;
