import React, { useState } from 'react';
import moment from 'moment';
import { Form } from 'formik';
import { Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import CustomForm from '../../../components/Form';
import IconButton from '../../../components/IconButton';
import BackButton from '../../../components/BackButton';
import { LINKS, ROUTES } from '../../../utils/constants';
import { INPUT_DATA, SCHEMA } from '../../../utils/forms';
import { updatePassword } from '../../../store/actions/personal.actions';
import { selectPassword } from '../../../store/reducers/personal.reducer';

const ViewPassword = () => {
    const { id } = useParams();
    const history = useHistory();
    const data = useSelector(selectPassword(id));
    const dispatch = useDispatch();

    const [password, setPassword] = useState(data);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEditMode = () => setIsEditMode(!isEditMode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    };

    const handleSubmit = async (values) => {
        dispatch(updatePassword(values, id, setIsLoading, handleEditMode));
    };

    if (!data) history.push(ROUTES.PERSONAL);

    return (
        <div className="p-3 md:p-5">
            <BackButton />
            <div className="flex items-center gap-5">
                <h2 className="font-bold text-3xl my-5 capitalize ">
                    View / Edit Password
                </h2>
                {!isEditMode && (
                    <button type="button" className="" onClick={handleEditMode}>
                        <IconButton Icon={Edit} fontSize="1rem" />
                    </button>
                )}
            </div>
            <CustomForm
                className="flex flex-col gap-3"
                initialValues={{
                    name: password?.name,
                    username: password?.username,
                    password: password?.password,
                    url: password?.url,
                }}
                validationSchema={SCHEMA.PERSONAL.PASSWORD}
                onSubmit={handleSubmit}
            >
                <Form>
                    {INPUT_DATA.PASSWORD.map(
                        (
                            { label, required, type, placeholder, name },
                            index
                        ) => (
                            <div className="flex flex-col" key={index}>
                                <Label>
                                    {label}
                                    {required && (
                                        <span className="text-danger ml-1">
                                            *
                                        </span>
                                    )}
                                </Label>
                                <Input
                                    type={type}
                                    name={name}
                                    value={password[name]}
                                    placeholder={placeholder}
                                    onChange={handleChange}
                                    className={`px-4 py-3 text-sm bg-mildgray color-white outline-none transition-all focus:border-2 focus:border-secondary border-opacity-0 rounded focus:border-opacity-100 w-full`}
                                    required={required}
                                    disabled={!isEditMode}
                                />
                            </div>
                        )
                    )}
                    <div className="flex flex-col gap-3">
                        {LINKS.VIEW_PASSWORD.map(({ label, name }, index) => (
                            <div className="flex flex-col" key={index}>
                                <Label className="capitalize">{label}</Label>
                                <p
                                    className={`px-4 py-3 text-sm bg-gray-900 color-white cursor-not-allowed outline-none transition-all focus:border-2 focus:border-secondary border-opacity-0 rounded focus:border-opacity-100 w-full`}
                                >
                                    {moment(password[name]).format('lll')}
                                </p>
                            </div>
                        ))}
                    </div>
                    {isEditMode && (
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="shadow p-2 px-8 rounded rounded-tl-xl rounded-br-xl flex items-center justify-center bg-secondary mt-5"
                                onClick={handleEditMode}
                            >
                                Cancel
                            </button>
                            <Button
                                type="submit"
                                title="Update"
                                className="bg-primary mt-5"
                                loading={isLoading}
                            />
                        </div>
                    )}
                </Form>
            </CustomForm>
        </div>
    );
};

export default ViewPassword;
