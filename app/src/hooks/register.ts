import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/register";

export const useRegisterUser = () => {
	return useMutation({ mutationFn: registerUser });
};
