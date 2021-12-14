import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type CreatePostType = {
	title: string;
	content: string;
};

const CreatePostContainer = () => {
	const { authState } = useContext(AuthContext);
	const initialValues = {
		title: '',
		content: '',
		username: authState.username
	};
	let history = useHistory();

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('You must provide a title for your post!'),
		content: Yup.string().required(
			'You must provide a content for your post!'
		)
	});

	const onSubmit = async (data: CreatePostType): Promise<void> => {
		await axios
			.post('http://localhost:3001/posts', data, {
				headers: {
					accessToken: localStorage.getItem('accessToken')!
				}
			})
			.then((response: AxiosResponse) => {
				if (response.data.error) {
					toast.error(
						'There was an error with the post creation, try again please!',
						{ theme: 'colored' }
					);
				} else {
                    history.push('/');
                }
			});
	};

	return {
		validationSchema,
		initialValues,
        onSubmit
	};
};

export default CreatePostContainer;
