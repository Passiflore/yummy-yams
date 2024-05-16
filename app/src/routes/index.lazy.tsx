import { useGameLauncher, useUserStore } from "../hooks/user";
import "../styles/Dice.css";
import "../styles/index.css";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const userStore = useUserStore();
	const gameLauncher = useGameLauncher();

	return (
		<div className="card-container">
			<div className="card">
				<h3 className="card-title home-title">Yummy yams</h3>
				<div className="button-container">
					{userStore.isConnected &&
						userStore.token &&
						!userStore.alreadyPlayed && (
							<Link>
								<button
									onClick={() => gameLauncher.mutate(userStore.token as string)}
									className="button pink-button"
								>
									<div className="button-inside">♡ PLAY ♡</div>
								</button>
							</Link>
						)}

					{!userStore.isConnected ? (
						<>
							<Link to="/login">
								<button className="button orange-button">
									<div className="button-inside">◊ Login ◊</div>
								</button>
							</Link>
							<Link to="/register">
								<button className="button brown-button">
									<div className="button-inside">♤ Register ♤</div>
								</button>
							</Link>
						</>
					) : (
						<button
							onClick={() => userStore.reset()}
							className="button orange-button"
						>
							<div className="button-inside">◊ Logout ◊</div>
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
