import { createLazyFileRoute } from "@tanstack/react-router";
import Game from "../pages/Game";

export const Route = createLazyFileRoute("/game")({
	component: Game,
});
