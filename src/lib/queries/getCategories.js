 import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/category/add`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
