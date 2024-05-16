import { useForm } from "@tanstack/react-form";
import { useRegisterUser } from "../hooks/register";
import { toast } from "react-hot-toast";
import "../styles/Login.css";
import { Link, useNavigate } from "@tanstack/react-router";

function Register() {
	const navigate = useNavigate();
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
					navigate({ to: "/" });
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
		<div className="card-container">
			<div className="card">
				<h3 className="card-title">Register Page</h3>
				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						registerForm.handleSubmit();
					}}
				>
					<div className="input-container">
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
								<div className="form-input">
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
							<div className="button-inside">◊ Register ◊</div>
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

export default Register;
