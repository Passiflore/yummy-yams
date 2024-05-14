import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
	component: () => (
		<>
			<Toaster reverseOrder={false} />
			<div>
				<Link to="/">Home</Link> <Link to="/about">About</Link>{" "}
				<Link to="/login">Login</Link> <Link to="/register">Register</Link>
			</div>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
