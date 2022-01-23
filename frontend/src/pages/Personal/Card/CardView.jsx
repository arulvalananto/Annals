import React, { useEffect, useState } from "react";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "../../../api/axios";
import BackButton from "../../../components/BackButton";
import CustomForm from "../../../components/Form";
import IconButton from "../../../components/IconButton";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { cardInputs, cardValidationSchema } from "../../../data/PersonalInputs";
import { errResponse } from "../../../utils/helpers";
import { selectCard } from "../../../store/reducers/personal.reducer";

const CardView = () => {
  const { id } = useParams();
  const history = useHistory();

  const data = useSelector(selectCard(id));

  const [card, setCard] = useState(data);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [card]);

  const handleEditMode = () => setIsEditMode(!isEditMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log(values);
      const response = await axios.patch(`/personal/${id}/card`, values);
      if (response.status === 200 && response.data) {
        toast.success(response.data.message);
        handleEditMode();
      }
    } catch (error) {
      errResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    history.push("/personal");
    return null;
  }

  console.log(card);

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
        onSubmit={handleSubmit}
      >
        <Form>
          {cardInputs.map(
            ({ label, required, type, placeholder, name }, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <Label>
                    {label}
                    {required && <span className="text-danger ml-1">*</span>}
                  </Label>
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
