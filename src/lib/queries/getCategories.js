import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get("http://localhost:3001/categories");
  return res.data;
};
