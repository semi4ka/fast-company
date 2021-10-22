import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        api.professions.fetchAll().then(data => {
            setProfessions(data);
        });
        api.qualities.fetchAll().then(data => {
            setQualities(data);
        });
    }, []);

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: { message: "Емаил обязателен" },
            isEmail: { message: "Емаил введен некоректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотябы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотябы одну цыфру"
            },
            min: {
                message: "Пароль должен содержать минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Поле обязательное для заполнения" }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };
    useEffect(() => validate(), [data]);
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
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
