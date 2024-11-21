import {
  // useQuery,
  useMutation,
  // useQueryClient,
  // UseMutationResult,
} from "@tanstack/react-query";
import axios from "../lib/axios";
import { notify } from "@/lib/notify";

// Define the type for new user input
interface NewUser {
  name: string;
  email: string;
}

// Define the type for the response data
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = async (newUser: NewUser): Promise<User> => {
  const { data } = await axios.post("/users", newUser);
  return data;
};

export const useCreateUser = () => {
  // @ts-expect-error it is necessary
  return useMutation<User, Error, NewUser>(createUser, {
    onSuccess: (data) => {
      notify("success", `User ${data.name} created successfully!`);
    },
    onError: (error) => {
      notify("error", error.message);
    },
  });
};

// const createUser = useCreateUser(); //usage

// USE QUERY

// const fetchUsers = async () => {
//   const { data } = await axios.get("/users");
//   return data;
// };

// export const useUsers = () => {
//   return useQuery({
//     queryKey: ["users"], // Pass queryKey as part of an object
//     queryFn: fetchUsers,
//   });
// };

// const { data, isLoading, error } = useUsers(); //usage
