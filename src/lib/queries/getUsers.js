import axios from "axios";

export const getUsers = async () => {
  const res = await axios.get("http://localhost:3001/users");
  return res.data;
};
