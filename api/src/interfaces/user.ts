export interface IUser {
	email: string;
	username: string;
	password: string;
	nbOfGames: number;
	prizes: string[];
	alreadyPlayed: boolean;
	diceRolls: number[];
	haveWon: boolean;
}
