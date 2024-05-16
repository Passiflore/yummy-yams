import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/auth";
import toast from "react-hot-toast";
import { useUserStore } from "../hooks/user";
import "../styles/Login.css";
import "../styles/index.css";
import { Link, useNavigate } from "@tanstack/react-router";

function Login() {
	const navigate = useNavigate();
	const LogUserIn = useLogUserIn();
	const userStore = useUserStore();
	const authForm = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			LogUserIn.mutate(value, {
				onSuccess(data) {
					toast.success("login successful");
					userStore.setToken(data.token);
					userStore.setIsConnected(true);
					navigate({ to: "/" });
				},
				onError(error) {
					toast.error(error.message);
				},
			});
		},
	});

	return (
		<div className="card-container">
			<div className="card">
				<h3 className="card-title">Login Page</h3>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						authForm.handleSubmit();
					}}
					className="form"
				>
					<div className="input-container">
						<authForm.Field
							name="email"
							validators={{
								onSubmit: ({ value }) => {
									if (!value) {
										return "Email is required";
									}
								},
							}}
							children={(field) => (
								<div className="form-input">
									<label htmlFor={field.name}>{field.name}</label>
									<input
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder={field.name}
									></input>
									{field.state.meta.errors && (
										<div className="error-message">
											{field.state.meta.errors}
										</div>
									)}
								</div>
							)}
						/>
						<authForm.Field
							name="password"
							validators={{
								onSubmit: ({ value }) => {
									if (!value) {
										return "Password is required";
									}
								},
							}}
							children={(field) => (
								<div className="form-input">
									<label htmlFor={field.name}>{field.name}</label>
									<input
										name={field.name}
										type="password"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder={field.name}
									/>
									{field.state.meta.errors && (
										<div className="error-message">
											{field.state.meta.errors}
										</div>
									)}
								</div>
							)}
						/>
					</div>
					<div className="button-container">
						<button className="button orange-button" type="submit">
							<div className="button-inside">◊ Login ◊</div>
						</button>
						<Link to="/">
							<button className="button brown-button">
								<div className="button-inside">♧ Back ♧</div>
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
