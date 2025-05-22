import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const getConsultants = async ({ page = 1, search = "" }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/consultants?page=${page}&limit=10&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { data, meta } = res.data;

  return {
    consultants: data,
    totalPages: meta.totalPages,
    currentPage: meta.currentPage,
    totalConsultants: meta.totalUsers,
  };
};
