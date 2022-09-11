import React from 'react';
import { Formik, Form } from 'formik';

const CustomForm = (props) => {
    const { children, className, initialValues, onSubmit, validationSchema } =
        props;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => <Form className={className}>{children}</Form>}
        </Formik>
    );
};

export default React.memo(CustomForm);
