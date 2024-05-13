import { User } from "../interfaces/auth.interface";

export const registerUser = async (connectionPayload: User) => {
	const response = await fetch(import.meta.env.VITE_API_URL + "/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(connectionPayload),
	});
	const data = await response.json();
	return data;
};
