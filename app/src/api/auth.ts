import { User } from "../interfaces/auth.interface";

export const loginUser = async (connectionPayload: User) => {
	const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(connectionPayload),
	});

	const data = await response.json();

	if (response.status !== 200) {
		throw new Error(data.message);
	}

	return data;
};
