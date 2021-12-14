import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { toast } from 'react-toastify';
import axios, { AxiosResponse } from 'axios';

type EditProfileType = {
	oldPassword: string;
	newPassword: string;
	newUsername: string;
};

const ChangeCredentialsContainer = () => {
	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [newUsername, setNewUsername] = useState<string>('');
	const { authState } = useContext(AuthContext);
	let history = useHistory();

	const changeCredentials = (): void => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to change your credentials?',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((response: SweetAlertResult) => {
			if (response.value) {
				if (
					newUsername === '' &&
					oldPassword === '' &&
					newPassword === ''
				) {
					toast.error(
						'If you want to change your credentials, fill the username field and/or the two password fields below!',
						{ theme: 'colored' }
					);
					return;
				} else {
					axios
						.put(
							'http://localhost:3001/users/changecredentials',
							{
								oldUsername: authState.username,
								oldPassword,
								newPassword,
								newUsername
							},
							{
								headers: {
									accessToken: localStorage.getItem(
										'accessToken'
									)!
								}
							}
						)
						.then((response: AxiosResponse) => {
							if (response.data.error) {
								toast.error(response.data.error, {
									theme: 'colored'
								});
							} else {
								toast.success(response.data.successMessage, {
									theme: 'colored'
								});
								setTimeout(() => {
									history.push('/');
									window.location.reload();
								}, 2000);
							}
						})
						.catch((error: any) => {
							toast.error(error.response.data.error, {
								theme: 'colored'
							});
						});
				}
			}
		});
	};

	const deleteProfile = (): void => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete your profile?',
			showCancelButton: true,
			confirmButtonText: 'Yes'
		}).then((response: SweetAlertResult) => {
			if (response.value) {
				axios
					.delete('http://localhost:3001/users', {
						headers: {
							accessToken: localStorage.getItem('accessToken')!
						}
					})
					.then((deleteResponse: AxiosResponse) => {
						if (deleteResponse.data.error) {
							toast.error(deleteResponse.data.error, {
								theme: 'colored'
							});
						} else {
							localStorage.removeItem('accessToken');
							window.location.reload();
						}
					})
					.catch((error: any) => {
						toast.error(error.response.data.error, {
							theme: 'colored'
						});
					});
			}
		});
	};

	return {
		oldPassword,
		setOldPassword,
		newPassword,
		setNewPassword,
		newUsername,
		setNewUsername,
		changeCredentials,
        deleteProfile
	};
};

export default ChangeCredentialsContainer;
