import React from "react";
import PropTypes from "prop-types";

const selectField = ({
    name,
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map(key => ({
                  name: options[key].name,
                  value: options[key]._id
              }))
            : options;
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionArray &&
                    optionArray.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
selectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    defaultOption: PropTypes.string,
    option: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default selectField;
