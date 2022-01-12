import React, { useState } from "react";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { withStyles } from "@mui/styles";
import { Form } from "formik";

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

const CustomTab = withStyles({
  root: { color: "#fff" },
  selected: { color: "#4b24bf" },
})(Tab);

const PersonalCreate = () => {
  const [categoryNumber, setCategoryNumber] = useState("1");

  const handleChange = (e, newValue) => {
    setCategoryNumber(newValue);
  };

  const handlePasswordCreate = (values) => {
    console.log(values);
  };
  const handleCardCreate = (values) => {
    console.log(values);
  };
  const handleWalletCreate = (values) => {
    console.log(values);
  };

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <div className="mt-5">
        <TabContext value={categoryNumber}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <CustomTab label="Password" value="1" />
              <CustomTab label="Crypto Wallet" value="2" />
              <CustomTab label="Card" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <CustomForm
              className="flex flex-col gap-3"
              initialValues={{ name: "", username: "", password: "", url: "" }}
              onSubmit={handlePasswordCreate}
            >
              <Form>
                {passwordInputs.map(
                  ({ label, type, placeholder, required }) => (
                    <div className="flex flex-col">
                      <Label>
                        {label}
                        {required && (
                          <span className="text-danger ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-primary border-2 border-opacity-0 rounded focus:border-opacity-100"
                        required={required}
                      />
                    </div>
                  )
                )}
                <Button
                  type="submit"
                  title="Create"
                  className="bg-secondary py-2 px-4 mt-5 rounded w-full transform hover:scale-95"
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
              }}
              onSubmit={handleWalletCreate}
            >
              <Form>
                {cryptoWalletInputs.map(
                  ({ label, required, type, placeholder }) => (
                    <div className="flex flex-col">
                      <Label>
                        {label}
                        {required && (
                          <span className="text-danger ml-1">*</span>
                        )}
                      </Label>
                      <Input
                        type={type}
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
              }}
              onSubmit={handleCardCreate}
            >
              <Form>
                {cardInputs.map(({ label, required, type, placeholder }) => (
                  <div className="flex flex-col">
                    <label className="text-xs mb-1 text-gray-600">
                      {label}
                      {required && <span className="text-danger ml-1">*</span>}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-primary border-2 border-opacity-0 rounded focus:border-opacity-100"
                      required={required}
                    />
                  </div>
                ))}
                <Button
                  type="submit"
                  title="Create"
                  className="bg-tertiary w-full text-black py-2 px-4 mt-5 rounded transform hover:scale-95"
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
