import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Form } from 'formik';
import { Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Label from '../../../components/Label';
import Input from '../../../components/Input';
import { ROUTES } from '../../../utils/routes';
import Button from '../../../components/Button';
import CustomForm from '../../../components/Form';
import BackButton from '../../../components/BackButton';
import IconButton from '../../../components/IconButton';
import { cardInputs } from '../../../data/PersonalInputs';
import { cardValidationSchema } from '../../../utils/formSchema';
import { updateCard } from '../../../store/actions/personal.actions';
import { selectCard } from '../../../store/reducers/personal.reducer';

const CardView = () => {
    const { id } = useParams();
    const { push } = useHistory();
    const dispatch = useDispatch();
    const data = useSelector(selectCard(id));

    const [card, setCard] = useState(data);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEditMode = () => setIsEditMode(!isEditMode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCard({ ...card, [name]: value });
    };

    const handleUpdate = async (values) => {
        dispatch(updateCard(values, id, setIsLoading, handleEditMode));
    };

    if (!data) push(ROUTES.PERSONAL);

    return (
        <div className="p-3 md:p-5">
            <BackButton />
            <div className="flex items-center gap-5">
                <h2 className="font-bold text-3xl my-5 capitalize ">
                    View / Edit Card
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
                    bankName: card?.bankName,
                    providerName: card?.providerName,
                    cardNumber: card?.cardNumber,
                    accountHolderName: card?.accountHolderName,
                    expiry: card?.expiry,
                }}
                validationSchema={cardValidationSchema}
                onSubmit={handleUpdate}
            >
                <Form>
                    {cardInputs.map(
                        (
                            { label, required, type, placeholder, name },
                            index
                        ) => {
                            return (
                                <div className="flex flex-col" key={index}>
                                    <Label>
                                        {label}
                                        {required && (
                                            <span className="text-danger ml-1">
                                                *
                                            </span>
                                        )}
                                    </Label>
                                    {!isEditMode && type === 'month' ? (
                                        <p
                                            className={`px-4 py-3 text-sm bg-gray-900 color-white outline-none transition-all focus:border-2 focus:border-secondary border-opacity-0 rounded focus:border-opacity-100 w-full`}
                                        >
                                            {moment(card[name]).format(
                                                'MMMM, YYYY'
                                            )}
                                        </p>
                                    ) : (
                                        <Input
                                            type={type}
                                            name={name}
                                            value={card[name]}
                                            placeholder={placeholder}
                                            onChange={handleChange}
                                            className={`px-4 py-3 text-sm bg-mildgray color-white outline-none transition-all focus:border-2 focus:border-secondary border-opacity-0 rounded focus:border-opacity-100 w-full`}
                                            required={required}
                                            disabled={!isEditMode}
                                        />
                                    )}
                                </div>
                            );
                        }
                    )}
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

export default CardView;
