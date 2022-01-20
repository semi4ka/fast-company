import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((key) => ({
                  label: options[key].name,
                  value: options[key]._id
              }))
            : options;
    const defaultValueArray = defaultValue.map((value) => ({
        label: value.name,
        value: value._id
    }));
    console.log(defaultValueArray);
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                defaultValue={defaultValueArray}
                isMulti
                closeMenuOnSelect={false}
                options={optionArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default MultiSelectField;
