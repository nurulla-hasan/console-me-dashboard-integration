import { useQuery } from "@tanstack/react-query";
import { getConsultants } from "@/lib/queries/getConsultants";

export const useConsultants = ({ page, search }) => {
  return useQuery({
    queryKey: ["consultants", page, search],
    queryFn: () => getConsultants({ page, search }),
    keepPreviousData: true,
  });
};
 