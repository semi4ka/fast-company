import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";

const LoginForm = () => {
    const { logIn } = useAuth();
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    // const validateSchema = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обязателен")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотябы одну заглавную букву"
    //         )
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотябы одну цыфру")
    //         .matches(/(?=.*[#@)$?^&*])/, "Пароль должен содержать #@)$?^&*")
    //         .matches(/(?=.{8,})/, "Пароль должен содержать минимум 8 символов"),
    //     email: yup
    //         .string()
    //         .required("Емаил обязателен")
    //         .email("Емаил введен некоректно")
    // });
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
        }
    };
    useEffect(() => validate(), [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateSchema
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch(err => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        try {
            await logIn(data);
            history.push(
                history.location.state.from.pathname
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setErrors(error);
        }
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
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
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

export default LoginForm;
