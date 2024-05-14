import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/auth";
import toast from "react-hot-toast";

function Login() {
	const LogUserIn = useLogUserIn();
	const authForm = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			LogUserIn.mutate(value, {
				onSuccess(data) {
					toast.success("login successful");
					console.log("login successful:", data);
				},
				onError(error) {
					toast.error(error.message);
				},
			});
		},
	});

	return (
		<>
			<p>Login Page</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					authForm.handleSubmit();
				}}
			>
				<div>
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
							<>
								<label htmlFor={field.name}>{field.name}</label>
								<input
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder={field.name}
								></input>
								{field.state.meta.errors && (
									<div>{field.state.meta.errors}</div>
								)}
							</>
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
							<>
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
									<div>{field.state.meta.errors}</div>
								)}
							</>
						)}
					/>
					<button type="submit">Login</button>
				</div>
			</form>
		</>
	);
}

export default Login;
