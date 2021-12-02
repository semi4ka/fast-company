import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = () => {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then(({ profession, ...data }) => {
            setData(prevState => ({
                ...prevState,
                ...data,
                profession: profession._id
            }));
        });
        api.professions.fetchAll().then(data => setProfessions(data));
        api.qualities.fetchAll().then(data => setQualities(data));
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
        validate();
    }, [data]);
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
        const { profession, qualities } = data;
        const fullData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualitiesFull(qualities)
        };
        api.users
            .update(userId, fullData)
            .then(data => {
                history.push("/users/" + data._id);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const getProfessionById = id => {
        for (const key in professions) {
            const profData = professions[key];
            if (profData._id === id) return profData;
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
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                {!isLoading && Object.keys(professions).length > 0 ? (
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
                ) : (
                    "loading..."
                )}
            </div>
        </div>
    );
};

export default EditUserPage;
