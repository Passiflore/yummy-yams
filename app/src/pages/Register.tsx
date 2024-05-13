import { useForm } from "@tanstack/react-form";
import { useRegisterUser } from "../hooks/register";

function Register() {
	const RegisterUser = useRegisterUser();
	const registerForm = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			RegisterUser.mutate(value, {
				onSuccess(data, variables, context) {
					console.log(data);
				},
			});
		},
	});

	return (
		<>
			<p>Register Page</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					registerForm.handleSubmit();
				}}
			>
				<div>
					<registerForm.Field
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
					<registerForm.Field
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
					<button type="submit">Register</button>
				</div>
			</form>
		</>
	);
}

export default Register;
