import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";
const Quality = ({ id }) => {
    const { getQuality, isLoading } = useQuality();
    const quality = getQuality(id);
    if (!isLoading) {
        return (
            <>
                <span
                    key={quality.color}
                    className={"me-2 badge bg-" + quality.color}
                >
                    {quality.name}
                </span>
            </>
        );
    } else {
        return "loading ...";
    }
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};
export default Quality;
