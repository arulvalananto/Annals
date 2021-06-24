export const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const day = (data) => weeks[new Date(data).getDay() - 1];
export const date = (data) => new Date(data).getDate();
export const month = (data) => months[new Date(data).getMonth()];
export const year = (data) => new Date(data).getFullYear();

export const dateString = (data) => new Date(data).toDateString("en-IN");
