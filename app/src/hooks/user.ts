import { create } from "zustand";
import {
	UserState,
	fetchUserDatasResponse,
} from "../interfaces/auth.interface";
import { devtools, persist } from "zustand/middleware";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const initialState = {
	token: null,
	username: "",
	nbOfGames: 0,
	prizes: [],
	isConnected: false,
	alreadyPlayed: false,
	diceRolls: [],
	haveWon: false,
};

export const useUserStore = create<UserState>()(
	devtools(
		persist(
			(set) => ({
				...initialState,
				setHaveWon: (haveWon) => set({ haveWon }),
				setToken: (token) => set({ token }),
				setUsername: (username) => set({ username }),
				setNbOfGames: (nbOfGames) => set({ nbOfGames }),
				setPrizes: (prizes) => set({ prizes }),
				setIsConnected: (isConnected) => set({ isConnected }),
				setAlreadyPlayed: (alreadyPlayed) => set({ alreadyPlayed }),
				setDiceRolls: (diceRolls) => set({ diceRolls }),
				reset: () => set(initialState),
			}),
			{ name: "user" }
		)
	)
);

export const fetchUserDatas = async (token: string) => {
	const response = await fetch(import.meta.env.VITE_API_URL + "/me/" + token, {
		method: "GET",
	});

	const data = await response.json();

	if (response.status === 404) {
		throw new Error(data.message);
	}

	return data;
};

export const useGetUserDatas = () => {
	const userStore = useUserStore();
	return useQuery<string, Error, fetchUserDatasResponse>({
		queryKey: ["user"],
		queryFn: () => fetchUserDatas(userStore.token as string),
		enabled: !!userStore.token,
	});
};

export const fetchGameInitialisation = async (token: string) => {
	const response = await fetch(import.meta.env.VITE_API_URL + "/launchGame", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();

	return data;
};

export const useGameLauncher = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation<boolean, Error, string>({
		mutationFn: fetchGameInitialisation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			navigate({ to: "/game" });
		},
	});
};

const mutateRollDice = async ({ token, lockedDices }: useRollDicePayload) => {
	const response = await fetch(import.meta.env.VITE_API_URL + "/rollDice", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ lockedDices }),
	});

	const data = await response.json();

	if (response.status === 401) {
		throw new Error(data.message);
	}

	return data;
};

export interface useRollDicePayload {
	token: string;
	lockedDices: boolean[];
}

export interface useRollDiceResponse {
	message: string;
	rolledDice: number[];
}

export const useRollDice = () => {
	return useMutation<useRollDiceResponse, Error, useRollDicePayload>({
		mutationFn: mutateRollDice,
	});
};

// export const useGetUserDatas = () => {
// 	const user = useUserStore((state) => state);
// 	return user;
// };
