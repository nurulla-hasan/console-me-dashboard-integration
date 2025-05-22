import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const getUsers = async (pageNumber = 1, query) => {
  console.log(query)
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users?page=${pageNumber}&limit=10&search=${query}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data, meta } = res.data;

    return {
      users: data,
      totalUsers: meta.totalUsers,
      totalPages: meta.totalPages,
      currentPage: meta.currentPage,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
