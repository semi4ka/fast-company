import React, { useState } from "react";
import SelectField from "../../common/form/selectField";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import TextArea from "../../common/form/textArea";

const AddComment = ({ users, onAdd, pageId }) => {
    const [data, setData] = useState({
        userId: "",
        content: "",
        pageId: pageId
    });
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        userId: {
            isRequired: { message: "user обязателен" }
        },
        content: {
            isRequired: { message: "field обязателен" }
        }
    };
    // useEffect(() => validate(), [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField
                            label="Выберите пользователя"
                            name="userId"
                            options={users}
                            defaultOption="Выберите пользователя"
                            value={data.userId}
                            onChange={handleChange}
                            error={errors.userId}
                        />
                    </div>
                    <TextArea
                        label="Message"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            onAdd(data, validate);
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
AddComment.propTypes = {
    users: PropTypes.array,
    onAdd: PropTypes.func,
    pageId: PropTypes.string
};
export default AddComment;
