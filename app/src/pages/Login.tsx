import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/auth";

function Login() {
	const LogUserIn = useLogUserIn();
	const authForm = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			LogUserIn.mutate(value, {
				onSuccess(data, variables, context) {
					console.log(data);
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
						name="username"
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
							</>
						)}
					/>
					<authForm.Field
						name="password"
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
								></input>
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
