import * as yup from "yup";

const passwordValidationSchema = yup.object().shape({
  name: yup.string().max(100).required(),
  username: yup.string().max(100),
  password: yup.string().max(100).required(),
  url: yup.string().url(),
});

const cryptoWalletValidationSchema = yup.object().shape({
  publicAddress: yup.string().max(256).required(),
  privateAddress: yup.string().max(256),
  passPhrase: yup.string().max(256),
});

const cardValidationSchema = yup.object().shape({
  bankName: "",
  providerName: "",
  cardNumber: "",
  accountHolderName: "",
  expiry: "",
});

const passwordInputs = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
    name: "name",
  },
  {
    label: "Username",
    type: "text",
    placeholder: "Enter username",
    info: "You can enter username/email/phone number here",
    name: "username",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    name: "password",
  },
  {
    label: "URL",
    type: "url",
    placeholder: "Enter URL",
    name: "url",
    required: true,
  },
];

const cryptoWalletInputs = [
  {
    label: "Public Address",
    type: "text",
    placeholder: "Enter public address",
    name: "publicAddress",
    required: true,
  },
  {
    label: "Private Address",
    type: "text",
    placeholder: "Enter private address",
    name: "privateAddress",
  },
  {
    label: "Pass Phrase",
    type: "text",
    placeholder: "Enter pass phrase",
    name: "passPhrase",
  },
];

const cardInputs = [
  {
    label: "Bank Name",
    type: "text",
    placeholder: "Enter bank name",
    required: true,
    name: "bankName",
  },
  {
    label: "Provider Name",
    type: "text",
    placeholder: "Enter provider name",
    name: "providerName",
  },
  {
    label: "Card Number",
    type: "text",
    placeholder: "Enter card number",
    required: true,
    name: "cardNumber",
  },
  {
    label: "Name of the Account Holder",
    type: "text",
    placeholder: "Enter account holder name",
    required: true,
    name: "accountHolderName",
  },
  {
    label: "Name of the Expiry Date",
    type: "month",
    placeholder: "Enter expiry date",
    required: true,
    name: "expiry",
  },
];

const panels = [
  {
    value: "1",
    initialValues: {
      name: "",
      username: "",
      password: "",
      url: "",
      category: "password",
    },
    inputs: passwordInputs,
    validationSchema: passwordValidationSchema,
    color: "secondary",
  },
  {
    value: "2",
    initialValues: {
      publicAddress: "",
      privateAddress: "",
      passPhrase: "",
      category: "cryptoWallet",
    },
    inputs: cryptoWalletInputs,
    validationSchema: cryptoWalletValidationSchema,
    color: "primary",
  },
  {
    value: "3",
    initialValues: {
      bankName: "",
      providerName: "",
      cardNumber: "",
      accountHolderName: "",
      expiry: "",
      category: "card",
    },
    inputs: cardInputs,
    validationSchema: cardValidationSchema,
    color: "tertiary",
  },
];

export const tabs = [
  { label: "Password" },
  { label: "Crypto Wallet" },
  { label: "Card" },
];

export default panels;
