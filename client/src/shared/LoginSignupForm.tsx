import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { AuthContext } from '../helpers/AuthContext';
import IconButton from '@material-ui/core/IconButton';
import LoginContainer from '../containers/LoginContainer';
import '../components/Login.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationContainer from '../containers/RegistrationContainer';
import '../components/Login.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

type LoginSignupFormProps = {
	pageName: string;
};

const LoginSignupForm = ({ pageName }: LoginSignupFormProps): JSX.Element => {
	const history = useHistory();

	const { handleSignup } = RegistrationContainer();

	const {
		setLoginUsername,
		setLoginPassword,
		isPassword,
		handleLogin,
		hidePassword,
		togglePasswordIcon
	} = LoginContainer();

	const initialValues = {
		username: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(3, 'The username must be at least 3 characters long!')
			.max(15, 'The username must be maximum 15 characters long!')
			.required('You must provide a username!'),
		password: Yup.string()
			.min(4, 'The password must be at least 4 characters long!')
			.max(20, 'The password must be maximum 20 characters long!')
			.required('You must provide a password!')
	});

	return (
		<div className="loginContainer">
			{pageName === 'registration'
				? <Formik
						initialValues={initialValues}
						onSubmit={handleSignup}
						validationSchema={validationSchema}
					>
						<Form className="loginCard">
							<div className="loginCardLeftSide">
								<div className="headerDiv">
									<h1>Create your new account</h1>
									<hr />
								</div>

								<div className="loginInputsDiv">
									<label
										htmlFor="username"
										className="inputLabel"
									>
										Username:
									</label>
									<ErrorMessage
										name="username"
										component="h3"
									/>
									<form>
										<Field
											type="text"
											name="username"
											autoComplete="off"
											className="loginInput"
											placeholder="Username"
										/>
									</form>

									<label
										htmlFor="password"
										className="inputLabel"
									>
										Password:
									</label>
									<ErrorMessage
										name="password"
										component="h3"
									/>
									<Field
										type={isPassword ? 'password' : 'text'}
										autoComplete="off"
										name="password"
										className="loginInput"
										placeholder="Password"
									/>
									<span onClick={() => togglePasswordIcon()}>
										{hidePassword
											? <EyeOutlined className="show-password-icon" />
											: <EyeInvisibleOutlined className="show-password-icon" />}
									</span>

									<button
										className="signInButton"
										type="submit"
									>
										Sign Up
									</button>
								</div>
							</div>

							<div className="loginCardRightSide">
								<div className="rightHeaderDiv">
									<div>
										<h1>Do you already have an account?</h1>
									</div>
									<div>
										<button
											className="signupButton"
											onClick={() => {
												history.push('/login');
											}}
										>
											Login
										</button>
									</div>
								</div>
							</div>
						</Form>
					</Formik>
				: <div className="loginCard">
						<div className="loginCardLeftSide">
							<div className="headerDiv">
								<h1>Sign in to your Account</h1>
								<hr />
							</div>
							<div className="loginInputsDiv">
								<label htmlFor="username" className="inputLabel">
									Username:
								</label>
								<input
									type="text"
									className="loginInput"
									placeholder="Username"
									onChange={event => {
										setLoginUsername(event.target.value);
									}}
								/>

								<label htmlFor="password" className="inputLabel">
									Password:
								</label>
								<input
									type={isPassword ? 'password' : 'text'}
									className="loginInput"
									placeholder="Password"
									onChange={event => {
										setLoginPassword(event.target.value);
									}}
								/>
								<span onClick={() => togglePasswordIcon()}>
									{hidePassword
										? <EyeOutlined className="show-password-icon" />
										: <EyeInvisibleOutlined className="show-password-icon" />}
								</span>

								<button
									className="signInButton"
									onClick={handleLogin}
								>
									Sign In
								</button>
							</div>
						</div>
						<div className="loginCardRightSide">
							<div className="rightHeaderDiv">
								<div>
									<h1>Don't you have an account?</h1>
								</div>
								<div>
									<button
										className="signupButton"
										onClick={() => {
											history.push('/registration');
										}}
									>
										Sign Up
									</button>
								</div>
							</div>
						</div>
					</div>}

			<ToastContainer
				position="top-right"
				autoClose={2500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default LoginSignupForm;
