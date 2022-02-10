import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessionById,
    getProfLoadingStatus,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const profession = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
