import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";
import PropTypes from "prop-types";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};
export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const getQualitiesList = async () => {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatch(error);
        }
    };
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };
    function errorCatch(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
            {children}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
