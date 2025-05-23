import axios from "axios";

export const blockUser = async (id) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/ban`,
    { user_id: id },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
