import { useForm } from "@tanstack/react-form";
import { useRegisterUser } from "../hooks/register";
import { toast } from "react-hot-toast";

function Register() {
	const registerUser = useRegisterUser();
	const registerForm = useForm({
		defaultValues: {
			email: "",
			username: "",
			password: "",
		},
		onSubmit: ({ value }) => {
			registerUser.mutate(value, {
				onSuccess: (data) => {
					toast.success("Registration Successful");
					console.log("Registration Successful:", data);
				},
				onError: (error) => {
					toast.error(error.message);
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
						name="email"
						validators={{
							onSubmit: ({ value }) => {
								if (!value) {
									return "Email is required";
								}
								if (!value.includes("@")) {
									return "Invalid Email";
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
					<registerForm.Field
						name="username"
						validators={{
							onSubmit: ({ value }) => {
								if (!value) {
									return "Username is required";
								}
								if (value.length < 4) {
									return "Username must be at least 4 characters";
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
					<registerForm.Field
						name="password"
						validators={{
							onSubmit: ({ value }) => {
								if (!value) {
									return "Password is required";
								}
								if (value.length < 12) {
									return "Password must be at least 12 characters";
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
								></input>
								{field.state.meta.errors && (
									<div>{field.state.meta.errors}</div>
								)}
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
