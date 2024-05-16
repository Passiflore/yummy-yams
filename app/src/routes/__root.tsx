import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import toast, { Toaster } from "react-hot-toast";
import { useGetUserDatas, useUserStore } from "../hooks/user";
import { useEffect } from "react";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const { data } = useGetUserDatas();
	const userStore = useUserStore();
	useEffect(() => {
		if (data) {
			userStore.setIsConnected(true);
			userStore.setNbOfGames(data.nbOfGames);
			userStore.setPrizes(data.prizes);
			userStore.setUsername(data.username);
			userStore.setAlreadyPlayed(data.alreadyPlayed);
			userStore.setDiceRolls(data.diceRolls);
			userStore.setHaveWon(data.haveWon);

			if (data.haveWon) {
				toast.success("You won a prize! 🎉");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<>
			<Toaster reverseOrder={false} />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	);
}
