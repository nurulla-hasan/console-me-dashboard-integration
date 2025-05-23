import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const blockUser = async (id) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/ban`,
    { user_id: id },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
