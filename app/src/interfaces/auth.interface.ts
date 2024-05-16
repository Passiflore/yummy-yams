export interface User {
	email: string;
	username?: string;
	password: string;
}

export interface UserState {
	token: string | null;
	username: string;
	nbOfGames: number;
	prizes: string[];
	isConnected: boolean;
	alreadyPlayed: boolean;
	diceRolls: number[];
	haveWon: boolean;
	setToken: (token: string) => void;
	setHaveWon: (haveWon: boolean) => void;
	setDiceRolls: (diceRolls: number[]) => void;
	setUsername: (username: string) => void;
	setNbOfGames: (nbOfGames: number) => void;
	setPrizes: (prizes: string[]) => void;
	setIsConnected: (isConnected: boolean) => void;
	setAlreadyPlayed: (alreadyPlayed: boolean) => void;
	reset: () => void;
}

export interface fetchUserDatasResponse {
	nbOfGames: number;
	prizes: string[];
	id: string;
	username: string;
	alreadyPlayed: boolean;
	diceRolls: number[];
	haveWon: boolean;
}
