import { ErrorMessage, Field, Form, Formik } from 'formik';
import CreatePostContainer from '../containers/CreatePostContainer';
import Navbar from '../shared/Navbar';
import './CreatePost.css';

const CreatePost = (): JSX.Element => {
	const { validationSchema, initialValues, onSubmit } = CreatePostContainer();

	return (
		<div className="createPostContainer">
			<Navbar />
			<div className="createPostFormDiv">
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					<Form className="createPostContainerForm">
						<label>Title:</label>
						<ErrorMessage name="title" component="h3" />
						<Field
							autoComplete="off"
							id="inputCreatePost"
							name="title"
							placeholder="Title of the post"
						/>

						<Field type="hidden" name="username" />

						<label>Content:</label>
						<ErrorMessage name="content" component="h3" />
						<Field
							autoComplete="off"
							id="inputCreatePost"
							name="content"
							placeholder="Content of the post"
						/>

						<button className="createPostButton" type="submit">
							Create Post
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default CreatePost;
