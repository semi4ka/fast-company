import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";

const EditUserPage = () => {
    const { userId } = useParams();
    const [data, setData] = useState();
    const [qualities, setQualities] = useState();
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.professions.fetchAll().then(data => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then(data => {
            setQualities(data);
        });
        api.users.getById(userId).then(data => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map(quality => ({
                    label: quality.name,
                    value: quality._id
                }))
            });
        });
    }, []);
    const validatorConfig = {
        email: {
            isRequired: { message: "Емаил обязателен" },
            isEmail: { message: "Емаил введен некоректно" }
        },
        profession: {
            isRequired: { message: "Поле обязательное для заполнения" }
        },
        name: {
            isRequired: { message: "Поле обязательное для заполнения" }
        }
    };
    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const fullData = {
            ...data,
            profession: getProfessionFull(),
            qualities: getQualitiesFull()
        };
        api.users
            .update(userId, fullData)
            .then(id => {
                console.log(id);
            })
            .catch(err => {
                console.log(err);
            });
        history.push("/users/" + userId);
    };
    const getProfessionFull = () => {
        for (const key in professions) {
            if (professions[key]._id === data.profession) {
                return professions[key];
            }
        }
    };
    const getQualitiesFull = () => {
        const res = [];
        data.qualities.forEach(quality => {
            for (const key in qualities) {
                if (qualities[key]._id === quality.value) {
                    res.push(qualities[key]);
                }
            }
        });
        return res;
    };
    if (data && qualities) {
        return (
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        label="Выбери профессию"
                        name="profession"
                        options={professions}
                        defaultOption="Choose..."
                        value={data.profession}
                        onChange={handleChange}
                        error={errors.profession}
                    />
                    <RadioField
                        label="Укажите пол"
                        name="sex"
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={data.sex}
                        onChange={handleChange}
                    />
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        label="Выберите ваши качества"
                        name="qualities"
                        defaultValue={data.qualities}
                    />

                    <button
                        className="btn btn-primary w-100 mx-auto"
                        disabled={!isValid}
                    >
                        Update
                    </button>
                </form>
            </div>
        );
    }
    return "Loading...";
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};
export default EditUserPage;
