import React, { useState } from "react";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { withStyles } from "@mui/styles";
import { Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BackButton from "../components/BackButton";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import {
  cardInputs,
  cryptoWalletInputs,
  passwordInputs,
} from "../data/PersonalInputs";
import { createPersonalData } from "../store/actions/personal.actions";

const CustomTab = withStyles({
  root: { color: "#fff" },
  selected: { color: "#4b24bf" },
})(Tab);

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

const PersonalCreate = () => {
  const [categoryNumber, setCategoryNumber] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLoading = (val) => setIsLoading(val);

  const handleChange = (e, newValue) => {
    setCategoryNumber(newValue);
  };

  const handleCreate = (values) => {
    console.log(values);
    dispatch(createPersonalData(handleLoading, values, history));
  };

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <div className="mt-5">
        <TabContext value={categoryNumber}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <CustomTab label="Password" value="1" disabled={isLoading} />
              <CustomTab label="Crypto Wallet" value="2" disabled={isLoading} />
              <CustomTab label="Card" value="3" disabled={isLoading} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CustomForm
              className="flex flex-col gap-3"
              initialValues={{
                name: "",
                username: "",
                password: "",
                url: "",
                category: "password",
              }}
              onSubmit={handleCreate}
              validationSchema={passwordValidationSchema}
            >
              <Form>
                {passwordInputs.map(
                  ({ label, type, placeholder, required, name }, index) => (
                    <div className="flex flex-col" key={index}>
                      <Label>
                        {label}
                        {required && (
                          <span className="text-danger ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-secondary border-2 border-opacity-0 rounded focus:border-opacity-100"
                        required={required}
                      />
                    </div>
                  )
                )}
                <Button
                  type="submit"
                  title="Create"
                  className="bg-secondary py-2 px-4 mt-5 rounded w-full transform hover:scale-95"
                  loading={isLoading}
                />
              </Form>
            </CustomForm>
          </TabPanel>
          <TabPanel value="2">
            <CustomForm
              className="flex flex-col gap-3"
              initialValues={{
                publicAddress: "",
                privateAddress: "",
                passPhrase: "",
                category: "cryptowallet",
              }}
              onSubmit={handleCreate}
              validationSchema={cryptoWalletValidationSchema}
            >
              <Form>
                {cryptoWalletInputs.map(
                  ({ label, required, type, placeholder, name }, index) => (
                    <div className="flex flex-col" key={index}>
                      <Label>
                        {label}
                        {required && (
                          <span className="text-danger ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-primary border-2 border-opacity-0 rounded focus:border-opacity-100"
                        required={required}
                      />
                    </div>
                  )
                )}
                <Button
                  type="submit"
                  className="bg-primary py-2 px-4 mt-5 rounded w-full transform hover:scale-95"
                  title="Create"
                  loading={isLoading}
                />
              </Form>
            </CustomForm>
          </TabPanel>
          <TabPanel value="3">
            <CustomForm
              className="flex flex-col gap-3"
              initialValues={{
                bankName: "",
                providerName: "",
                cardNumber: "",
                accountHolderName: "",
                expiry: "",
                category: "card",
              }}
              onSubmit={handleCreate}
              validationSchema={cardValidationSchema}
            >
              <Form>
                {cardInputs.map(
                  ({ label, required, type, placeholder, name }, index) => (
                    <div className="flex flex-col" key={index}>
                      <label className="text-xs mb-1 text-gray-600">
                        {label}
                        {required && (
                          <span className="text-danger ml-1">*</span>
                        )}
                      </label>
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all duration-100 focus:border-tertiary border-2 border-opacity-0 rounded focus:border-opacity-100"
                        required={required}
                      />
                    </div>
                  )
                )}
                <Button
                  type="submit"
                  title="Create"
                  className="bg-tertiary w-full text-black py-2 px-4 mt-5 rounded transform hover:scale-95"
                  loading={isLoading}
                />
              </Form>
            </CustomForm>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default PersonalCreate;
