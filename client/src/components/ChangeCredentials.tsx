import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import ChangeCredentialsContainer from '../containers/ChangeCredentialsContainer';
import { AuthContext } from '../helpers/AuthContext';
import Navbar from '../shared/Navbar';
import './ChangeCredentials.css';
import 'react-toastify/dist/ReactToastify.css';

const ChangeCredentials = (): JSX.Element => {
	const { authState } = useContext(AuthContext);
	const {
		setOldPassword,
		setNewPassword,
		setNewUsername,
		changeCredentials,
		deleteProfile
	} = ChangeCredentialsContainer();

	return (
		<div className="changePasswordContainer">
			<Navbar />
			<div className="changePasswordCard">
				<h2>Change Username:</h2>
				<div className="changeUsernameDiv">
					<form autoComplete="off">
						<input
							type="text"
							className="changePasswordInput changeUsernameInput"
							value={authState.username}
						/>
						<input
							className="changePasswordInput changeUsernameInput"
							placeholder="New username"
							onChange={event => {
								setNewUsername(event.target.value);
							}}
						/>
					</form>
				</div>

				<h2>Change Password:</h2>
				<div className="changePasswordCardInnerContent">
					<div>
						<input
							className="changePasswordInput"
							type="password"
							placeholder="Old password"
							onChange={event => {
								setOldPassword(event.target.value);
							}}
						/>
					</div>

					<div>
						<input
							className="changePasswordInput"
							type="password"
							placeholder="New password"
							onChange={event => {
								setNewPassword(event.target.value);
							}}
						/>
					</div>

					<div>
						<button
							className="changePasswordSubmitButton"
							onClick={changeCredentials}
						>
							Save Changes
						</button>
					</div>
					<div>
						<button
							className="deleteProfileButton"
							onClick={deleteProfile}
						>
							Delete profile
						</button>
					</div>
				</div>
			</div>

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

export default ChangeCredentials;
