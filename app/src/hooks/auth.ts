import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";

export const useLogUserIn = () => {
	return useMutation({ mutationFn: loginUser });
};
