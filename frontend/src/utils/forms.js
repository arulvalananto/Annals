import * as yup from 'yup';

export const SCHEMA = {
    SIGN_UP: yup.object().shape({
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
    }),
    SIGN_IN: yup.object().shape({
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
    }),
    FORGOT_PASSWORD: yup.object().shape({
        email: yup
            .string()
            .email('Please enter valid email address')
            .required('Email address is required')
            .label('Email Address'),
    }),
    RESET_PASSWORD: yup.object().shape({
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
    }),
    VERIFY_MASTER_PASSWORD: yup.object().shape({
        password: yup
            .string()
            .min(10, 'Minimum length should be above 10')
            .required('Field is required')
            .label('Master Password'),
    }),
    CREATE_MASTER_PASSWORD: yup.object().shape({
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
    }),
    PERSONAL: {
        PASSWORD: yup.object().shape({
            name: yup.string().max(100).required(),
            username: yup.string().max(100),
            password: yup.string().max(100).required(),
            url: yup.string().url(),
        }),
        CRYPTO_WALLET: yup.object().shape({
            name: yup.string().max(256).required(),
            publicAddress: yup.string().max(256).required(),
            privateAddress: yup.string().max(256),
            passPhrase: yup.string().max(256),
        }),
        CARD: yup.object().shape({
            bankName: yup.string().max(256).required(),
            providerName: yup.string().max(10).required(),
            cardNumber: yup.string().max(16).required(),
            accountHolderName: yup.string().max(20).required(),
            expiry: yup.date().required(),
        }),
    },
};

export const INPUT_DATA = {
    PASSWORD: [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            required: true,
            name: 'name',
        },
        {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter username',
            info: 'You can enter username/email/phone number here',
            name: 'username',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            required: true,
            name: 'password',
        },
        {
            label: 'URL',
            type: 'url',
            placeholder: 'Enter URL',
            name: 'url',
            required: true,
        },
    ],
    CRYPTO_WALLET: [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter wallet name',
            name: 'name',
            required: true,
        },
        {
            label: 'Public Address',
            type: 'text',
            placeholder: 'Enter public address',
            name: 'publicAddress',
            required: true,
        },
        {
            label: 'Private Address',
            type: 'text',
            placeholder: 'Enter private address',
            name: 'privateAddress',
        },
        {
            label: 'Pass Phrase',
            type: 'text',
            placeholder: 'Enter pass phrase',
            name: 'passPhrase',
        },
    ],
    CARD: [
        {
            label: 'Bank Name',
            type: 'text',
            placeholder: 'Enter bank name',
            required: true,
            name: 'bankName',
        },
        {
            label: 'Provider Name',
            type: 'text',
            placeholder: 'Enter provider name',
            name: 'providerName',
            required: true,
        },
        {
            label: 'Card Number',
            type: 'text',
            placeholder: 'Enter card number',
            required: true,
            name: 'cardNumber',
        },
        {
            label: 'Name of the Account Holder',
            type: 'text',
            placeholder: 'Enter account holder name',
            required: true,
            name: 'accountHolderName',
        },
        {
            label: 'Name of the Expiry Date',
            type: 'month',
            placeholder: 'Enter expiry date',
            required: true,
            name: 'expiry',
        },
    ],
};

const FORM_DATA = [
    {
        value: '1',
        initialValues: {
            name: '',
            username: '',
            password: '',
            url: '',
            category: 'password',
        },
        inputs: INPUT_DATA.PASSWORD,
        validationSchema: SCHEMA.PERSONAL.PASSWORD,
        color: 'secondary',
    },
    {
        value: '2',
        initialValues: {
            publicAddress: '',
            privateAddress: '',
            passPhrase: '',
            category: 'cryptoWallet',
        },
        inputs: INPUT_DATA.CRYPTO_WALLET,
        validationSchema: SCHEMA.PERSONAL.CRYPTO_WALLET,
        color: 'primary',
    },
    {
        value: '3',
        initialValues: {
            bankName: '',
            providerName: '',
            cardNumber: '',
            accountHolderName: '',
            expiry: '',
            category: 'card',
        },
        inputs: INPUT_DATA.CARD,
        validationSchema: SCHEMA.PERSONAL.CARD,
        color: 'tertiary',
    },
];

export const tabs = [
    { label: 'Password' },
    { label: 'Crypto Wallet' },
    { label: 'Card' },
];

export default FORM_DATA;
