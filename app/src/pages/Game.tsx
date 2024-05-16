import { useRef, useState } from "react";
import "../styles/Dice.css";
import "../styles/index.css";
import { Link } from "@tanstack/react-router";
import { useRollDice, useUserStore } from "../hooks/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function Game() {
	const dicesContainerRef = useRef<HTMLDivElement>(null);
	const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
	const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));
	const [message, setMessage] = useState("");
	const [isWinner, setIsWinner] = useState(false);
	const [nbOfGamesLeft, setNbOfGamesLeft] = useState(3);
	const rollDicesHook = useRollDice();
	const userStore = useUserStore();
	const queryClient = useQueryClient();

	const handleRollDicesAction = () => {
		rollDicesHook.mutate(
			{
				token: userStore.token as string,
				lockedDices: locked,
			},
			{
				onSuccess: (data) => {
					rollDices(data.rolledDice);
					queryClient.invalidateQueries({ queryKey: ["user"] });

					if (userStore.haveWon) toast.success("You won a prize! 🎉");
				},
				onError: (error) => {
					toast.error(error.message);
				},
			}
		);
	};

	const checkCombinations = (values) => {
		const counts = values.reduce(
			(acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
			{}
		);
		const countsArray = Object.values(counts);

		if (countsArray.includes(5)) {
			setIsWinner(true);
			return "Victoire avec 5 dés identiques!";
		} else if (countsArray.includes(4)) {
			setIsWinner(true);
			return "Victoire avec 4 dés identiques!";
		} else if (countsArray.filter((item) => item === 2).length === 2) {
			setIsWinner(true);
			return "Victoire avec 2 paires de dés!";
		}
		return ""; // Pas de combinaison gagnante
	};

	const animations = [
		"rolling",
		"rolling2",
		"rolling3",
		"rolling4",
		"rolling5",
		"rolling6",
	];

	const toggleLock = (index: number) => {
		const newLocked = [...locked];
		newLocked[index] = !newLocked[index];
		setLocked(newLocked);
	};

	const rollDices = (rolledDices: number[]) => {
		if (nbOfGamesLeft === 0) return;
		if (!dicesContainerRef.current) return;

		const newDiceValues = [...diceValues];
		const dices = dicesContainerRef.current.children;

		if (lockedValues.length === 5 || isWinner || nbOfGamesLeft === 0) {
			setNbOfGamesLeft(nbOfGamesLeft - 1);
		}

		Array.from(dices).forEach((diceElement, index) => {
			if (locked[index]) return;
			const dice = diceElement as HTMLElement;
			const random = rolledDices[index];
			newDiceValues[index] = random;
			const animationName = animations[index % animations.length];
			dice.style.animation = `${animationName} 4s`;

			setTimeout(() => {
				// Ajuste la transformation en fonction de la valeur 'random'
				switch (random) {
					case 1:
						dice.style.transform = "rotateX(0deg) rotateY(0deg)";
						break;
					case 6:
						dice.style.transform = "rotateX(180deg) rotateY(0deg)";
						break;
					case 2:
						dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
						break;
					case 5:
						dice.style.transform = "rotateX(90deg) rotateY(0deg)";
						break;
					case 3:
						dice.style.transform = "rotateX(0deg) rotateY(90deg)";
						break;
					case 4:
						dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
						break;
					default:
						break;
				}
				dice.style.animation = "none";
			}, 4050);
		});
		setDiceValues(newDiceValues);
		const result = checkCombinations(newDiceValues);
		setMessage(result);
	};

	const lockedValues = diceValues
		.filter((value, index) => locked[index])
		.join(", ");

	return (
		<div className="card-container">
			<div className="card">
				<h3 className="card-title">Let's play !</h3>
				<div className="dice-container" ref={dicesContainerRef}>
					{[...Array(5)].map((_, index) => (
						<div
							key={index}
							className={`dice ${locked[index] ? "locked" : ""}`}
							onClick={() => toggleLock(index)}
						>
							<div
								className={`face front ${locked[index] ? "locked" : ""}`}
							></div>
							<div
								className={`face back ${locked[index] ? "locked" : ""}`}
							></div>
							<div
								className={`face right ${locked[index] ? "locked" : ""}`}
							></div>
							<div
								className={`face left ${locked[index] ? "locked" : ""}`}
							></div>
							<div
								className={`face top ${locked[index] ? "locked" : ""}`}
							></div>
							<div
								className={`face bottom ${locked[index] ? "locked" : ""}`}
							></div>
						</div>
					))}
				</div>
				<div className="button-container">
					<button
						className="button pink-button"
						onClick={() => handleRollDicesAction()}
						disabled={
							lockedValues.length === 5 || isWinner || nbOfGamesLeft === 0
						}
					>
						<div className="button-inside">♡ ROLL ♡</div>
					</button>
					<Link to="/">
						<button className="button orange-button">
							<div className="button-inside">◊ BACK ◊</div>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Game;
