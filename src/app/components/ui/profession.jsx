import React from "react";
import { useProfession } from "../../hooks/useProffesion";
import PropTypes from "prop-types";

// import React from "react";
const Profession = ({ id }) => {
    const { getProfession, isLoading } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
