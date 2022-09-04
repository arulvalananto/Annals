import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email address')
        .required('Email address is required')
        .label('Email Address'),
});

export const resetSchema = yup.object().shape({
    code: yup.string().required('Please enter validation code'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password length should be 8 or above characters')
        .label('Password'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .min(8, 'Password length should be 8 or above characters')
        .label('Password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const verifyMasterPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(10, 'Minimum length should be above 10')
        .required('Field is required')
        .label('Master Password'),
});

export const createMasterPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(10, 'Minimum length should be above 10')
        .required('Field is required')
        .label('Master password'),
    confirmPassword: yup
        .string()
        .min(10, 'Minimum length should be above 10')
        .required('Field is required')
        .label('Confirm master password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email address')
        .required('Email address is required')
        .label('Email Address'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password length should be 8 or above characters')
        .label('Password'),
});

export const signUpSchema = yup.object().shape({
    fullName: yup
        .string()
        .max(30, 'Existing name length')
        .required('Full name is required')
        .label('Full Name'),
    email: yup
        .string()
        .email('Please enter valid email address')
        .required('Email Address is required')
        .label('Email Address'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password length should be 8 or above characters')
        .label('Password'),
    confirmPassword: yup
        .string()
        .required('Confirm Password is required')
        .min(8, 'Password length should be 8 or above characters')
        .label('Password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const passwordValidationSchema = yup.object().shape({
    name: yup.string().max(100).required(),
    username: yup.string().max(100),
    password: yup.string().max(100).required(),
    url: yup.string().url(),
});

export const cryptoWalletValidationSchema = yup.object().shape({
    name: yup.string().max(256).required(),
    publicAddress: yup.string().max(256).required(),
    privateAddress: yup.string().max(256),
    passPhrase: yup.string().max(256),
});

export const cardValidationSchema = yup.object().shape({
    bankName: yup.string().max(256).required(),
    providerName: yup.string().max(10).required(),
    cardNumber: yup.string().max(16).required(),
    accountHolderName: yup.string().max(20).required(),
    expiry: yup.date().required(),
});
