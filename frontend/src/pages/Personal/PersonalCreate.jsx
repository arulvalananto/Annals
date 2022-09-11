import React, { useState } from 'react';
import { Form } from 'formik';
import { Box } from '@mui/system';
import { Tab } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import FORM_DATA, { tabs } from '../../utils/forms';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomForm from '../../components/Form';
import BackButton from '../../components/BackButton';
import { createPersonalData } from '../../store/actions/personal.actions';

const CustomTab = withStyles({
    root: { color: '#fff' },
    selected: { color: '#4b24bf' },
    disabled: { color: '#ffff' },
})(Tab);

const PersonalCreate = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [categoryNumber, setCategoryNumber] = useState('1');

    const handleChange = (e, newValue) => setCategoryNumber(newValue);

    const handleCreate = (values) =>
        dispatch(createPersonalData(values, setIsLoading, push));

    return (
        <div className="p-1 sm:p-5">
            <BackButton />
            <div className="mt-5">
                <TabContext value={categoryNumber}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            {tabs.map(({ label }, index) => (
                                <CustomTab
                                    key={index}
                                    label={label}
                                    value={`${index + 1}`}
                                    disabled={isLoading}
                                />
                            ))}
                        </TabList>
                    </Box>
                    {FORM_DATA.map(
                        (
                            {
                                value,
                                initialValues,
                                validationSchema,
                                inputs,
                                color,
                            },
                            index
                        ) => (
                            <TabPanel value={value} key={index}>
                                <CustomForm
                                    className="flex flex-col gap-3"
                                    initialValues={initialValues}
                                    onSubmit={handleCreate}
                                    validationSchema={validationSchema}
                                >
                                    <Form>
                                        {inputs.map(
                                            (
                                                {
                                                    label,
                                                    type,
                                                    placeholder,
                                                    required,
                                                    name,
                                                },
                                                index
                                            ) => (
                                                <div
                                                    className="flex flex-col"
                                                    key={index}
                                                >
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
                                                        placeholder={
                                                            placeholder
                                                        }
                                                        className={`px-4 py-3 text-sm bg-mildgray outline-none transition-all border-0 focus:border-2 focus:border-${color} rounded w-full`}
                                                        required={required}
                                                    />
                                                </div>
                                            )
                                        )}
                                        <Button
                                            type="submit"
                                            title="Create"
                                            className={`bg-${color} py-2 px-4 mt-5 rounded w-full transform hover:scale-95`}
                                            loading={isLoading}
                                        />
                                    </Form>
                                </CustomForm>
                            </TabPanel>
                        )
                    )}
                </TabContext>
            </div>
        </div>
    );
};

export default PersonalCreate;
