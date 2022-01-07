import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { withStyles } from "@mui/styles";

const passwordInputs = [
  {
    label: "Name",
    type: "text",
    placeholder: "Enter name",
    required: true,
  },
  {
    label: "Username",
    type: "text",
    placeholder: "Enter username",
    info: "You can enter username/email/phone number here",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
  {
    label: "URL",
    type: "url",
    placeholder: "Enter URL",
    required: true,
  },
];

const cryptoWalletInputs = [
  {
    label: "Public Address",
    type: "text",
    placeholder: "Enter public address",
  },
  {
    label: "Private Address",
    type: "text",
    placeholder: "Enter private address",
  },
  {
    label: "Pass Phrase",
    type: "text",
    placeholder: "Enter pass phrase",
  },
];

const CustomTab = withStyles({
  root: { color: "#fff" },
  selected: { color: "#4b24bf" },
})(Tab);

const PersonalCreate = () => {
  const [categoryNumber, setCategoryNumber] = useState("1");

  const handleChange = (e, newValue) => {
    setCategoryNumber(newValue);
  };

  const handlePasswordCreate = (e) => {
    e.preventDefault();
  };

  const handleWalletCreate = (e) => {
    e.preventDefault();
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
            <form
              className="flex flex-col gap-3"
              onSubmit={handlePasswordCreate}
            >
              {passwordInputs.map(({ label, type, placeholder, required }) => (
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
              <button
                type="submit"
                className="bg-secondary py-2 px-4 mt-5 rounded"
              >
                Create
              </button>
            </form>
          </TabPanel>
          <TabPanel value="2">
            <form className="flex flex-col gap-3" onSubmit={handleWalletCreate}>
              {cryptoWalletInputs.map(
                ({ label, required, type, placeholder }) => (
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
                )
              )}
              <button
                type="submit"
                className="bg-primary py-2 px-4 mt-5 rounded"
              >
                Create
              </button>
            </form>
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default PersonalCreate;
