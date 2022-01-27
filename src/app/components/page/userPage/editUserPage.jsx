import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../../common/backButton";
import { useQuality } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProffesion";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const [isLoading, setLoading] = useState(true);
    const { updateUserData, currentUser } = useAuth();
    const history = useHistory();

    const { professions, isLoading: isLoadingProf } = useProfession();
    const { qualities, isLoading: isLoadingQual } = useQuality();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professionsList = professions.map((p) => ({
        name: p.name,
        value: p._id
    }));
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});

    function getQualitiesByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const res = getQualitiesByIds(data).map((q) => ({
            label: q.name,
            value: q._id
        }));
        return res;
    };

    useEffect(() => {
        if (!isLoadingProf && !isLoadingQual && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [isLoadingProf, isLoadingQual, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });
        history.push(`/users/${currentUser._id}`);
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
                            options={professionsList}
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
                            defaultValue={data.qualities}
                            options={qualitiesList}
                            onChange={handleChange}
                            label="Выберите ваши качества"
                            name="qualities"
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
