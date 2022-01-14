import toast from "react-hot-toast";

export const classNames = (condition, yes, no) => {
  return condition ? yes : no;
};

export const errResponse = (err) => {
  if (err.response)
    return toast.error(err.response.data.message, {
      duration: "6000",
    });
  toast.error(err.message);
};
