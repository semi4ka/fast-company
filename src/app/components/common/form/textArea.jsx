import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ label, name, rows, value, onChange, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    rows={rows}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextArea.defaultProps = {
    rows: "3"
};
TextArea.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextArea;
