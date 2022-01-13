export const passwordInputs = [
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

export const cryptoWalletInputs = [
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

export const cardInputs = [
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
