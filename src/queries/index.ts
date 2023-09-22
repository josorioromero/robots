import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useFetchRobots = () => {
  return useQuery<Robot[], Error>("robots", async () => {
    const { data } = await axios.get("//localhost:5000/api/robots");
    return data;
  });
};

export const useAddRobot = () => {
  const queryClient = useQueryClient();

  return useMutation<Robot, Error, Robot>(
    (newRobot) => axios.post("//localhost:5000/api/robots", newRobot),
    {
      onSuccess: () => {
        // Invalidate the "robots" query to refetch data
        queryClient.invalidateQueries("robots");
      },
    }
  );
};
