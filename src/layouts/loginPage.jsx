import React, { useState, useEffect } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const LoginPage = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Ligin form</h3>
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
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
