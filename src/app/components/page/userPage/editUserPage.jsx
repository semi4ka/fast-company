import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory, useParams } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import { useQuality } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProffesion";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { upDate, currentUser } = useAuth();
    const history = useHistory();
    const { userId } = useParams();
    if (currentUser && currentUser._id !== userId) {
        history.push(`/users/${currentUser._id}/edit`);
    }

    const { professions, isLoading: isLoadingProf } = useProfession();
    const { qualities, isLoading: isLoadingQual } = useQuality();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession,
        sex: user.sex,
        qualities: qualities
    });
    const [errors, setErrors] = useState({});
    const qualitiesListInit = qualities.filter((q) =>
        data.qualities.includes(q._id)
    );

    useEffect(() => {
        setData(user);
    }, []);

    useEffect(() => {
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
    const handleChange = (target) => {
        console.log(target);
        setData((prevState) => ({
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        const profData =
            !Array.isArray(data.profession) &&
            typeof data.profession === "object"
                ? getProfessionByName(data.profession)
                : data.profession;
        if (!isValid) return;
        const fullData = {
            ...data,
            profession: profData,
            qualities: getQualitiesFull()
        };
        console.log(fullData);
        upDate(fullData);
        history.push(`/users/${userId}`);
    };
    const getProfessionByName = (name) => {
        for (const key in professions) {
            const profData = professions[key];
            if (profData.name === name) return profData._id;
        }
    };
    const getQualitiesFull = () => {
        if (
            !Array.isArray(data.qualities[0]) &&
            typeof data.qualities[0] === "object"
        ) {
            const res = [];
            data.qualities.forEach((quality) => {
                for (const key in qualities) {
                    if (qualities[key]._id === quality.value) {
                        res.push(qualities[key]._id);
                    }
                }
            });
            return res;
        }
        return data.qualities;
    };
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                {!isLoadingProf &&
                !isLoadingQual &&
                Object.keys(professions).length > 0 ? (
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
                            options={qualitiesList}
                            onChange={handleChange}
                            label="Выберите ваши качества"
                            name="qualities"
                            defaultValue={qualitiesListInit}
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
