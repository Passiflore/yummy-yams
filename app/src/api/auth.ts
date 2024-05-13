import { User } from "../interfaces/auth.interface";

export const loginUser = (connectionPayload: User) => {
	return fetch(import.meta.env.VITE_API_URL + "/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(connectionPayload),
	});
};
