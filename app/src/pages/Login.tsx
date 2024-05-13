import { useForm } from "@tanstack/react-form";

function Login() {
	const authForm = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			console.log(value);
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
