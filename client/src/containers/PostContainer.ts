import axios, { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import { Comment } from '../models/Comment';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { ParamTypes } from './ProfileContainer';
import Swal, { SweetAlertResult } from 'sweetalert2';

type CommentToAddType = {
	content: string;
	username: string;
	Likes: Like[];
};

const PostContainer = () => {
	const { id } = useParams<ParamTypes>();
	const [postObject, setPostObject] = useState<Post | null>(null);
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState<string>('');
	const [likedComments, setLikedComments] = useState<number[]>([]);
	const { authState } = useContext(AuthContext);
	let history = useHistory();

	const getCurrentPost = async (): Promise<void> => {
		await axios
			.get(`http://localhost:3001/posts/${id}`, {
				headers: {
					accessToken: localStorage.getItem('accessToken')!
				}
			})
			.then((response: AxiosResponse) => {
				setPostObject(response.data);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const getComments = async (): Promise<void> => {
		await axios
			.get(`http://localhost:3001/comments/${id}`, {
				headers: {
					accessToken: localStorage.getItem('accessToken')!
				}
			})
			.then((response: AxiosResponse) => {
				setComments(response.data.listOfComments);
				setLikedComments(
					response.data.likedComments.map((likedComment: Like) => {
						return likedComment.commentId;
					})
				);
			});
	};

	const addComment = async (): Promise<void> => {
		await axios
			.post(
				'http://localhost:3001/comments',
				{
					username: authState.username,
					commentContent: newComment,
					postId: id
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')!
					}
				}
			)
			.then((response: AxiosResponse) => {
				if (response.data.error) {
					toast.error(response.data.error, {
						theme: 'colored'
					});
				} else {
					const commentToAdd: CommentToAddType = {
						content: response.data.commentContent,
						username: response.data.username,
						Likes: []
					};

					setComments([...comments, commentToAdd] as Comment[]);
					setNewComment('');
					window.location.reload();
				}
			});
	};

	const deleteComment = (commentId: number): void => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete your comment?',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then(async (response: SweetAlertResult) => {
			if (response.value) {
				await axios
					.delete(`http://localhost:3001/comments/${commentId}`, {
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
							setComments(
								comments.filter((comment: Comment) => {
									return comment.id !== commentId;
								})
							);
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

	const deletePost = (postId: number): void => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete your post?',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then(async (confirmButtonResponse: SweetAlertResult) => {
			if (confirmButtonResponse.value) {
				await axios
					.delete(`http://localhost:3001/posts/${postId}`, {
						headers: {
							accessToken: localStorage.getItem('accessToken')!
						}
					})
					.then((response: AxiosResponse) => {
						if (response.data.error) {
							toast.error(response.data.error, {
								theme: 'colored'
							});
						} else {
							toast.success(response.data, { theme: 'colored' });
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
		});
	};

	const editPost = (option: string) => {
		if (option === 'title') {
			Swal.fire({
				title: 'Enter the new title:',
				input: 'text',
				showCancelButton: true,
				inputPlaceholder: 'Your new title'
			}).then(async (inputResponse: SweetAlertResult) => {
				if (inputResponse.value) {
					await axios
						.put(
							`http://localhost:3001/posts/title`,
							{
								newTitle: inputResponse.value,
								postId: id
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
								toast.error(
									'We were unable to update the title, please try again!',
									{ theme: 'colored' }
								);
							} else {
								setPostObject(
									{
										...postObject,
										title: inputResponse.value
									} as Post
								);
							}
						})
						.catch((error: any) => {
							toast.error(error.response.data.error, {
								theme: 'colored'
							});
						});
				}
			});
		} else {
			Swal.fire({
				title: 'Enter the new content of the post:',
				input: 'text',
				showCancelButton: true,
				inputPlaceholder: 'Your new content'
			}).then((inputResponse: SweetAlertResult) => {
				if (inputResponse.value) {
					axios
						.put(
							`http://localhost:3001/posts/content`,
							{
								newContent: inputResponse.value,
								postId: id
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
								setPostObject(
									{
										...postObject,
										content: inputResponse.value
									} as Post
								);
							}
						})
						.catch((error: any) => {
							toast.error(error.response.data.error, {
								theme: 'colored'
							});
						});
				}
			});
		}
	};

	const likeComment = async (commentId: number): Promise<void> => {
		await axios
			.post(
				'http://localhost:3001/like/comment',
				{
					commentId
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')!
					}
				}
			)
			.then((response: AxiosResponse) => {
				setComments(
					comments.map((comment: Comment) => {
						if (comment.id === commentId) {
							if (response.data.isLiked) {
								return {
									...comment,
									Likes: [...comment.Likes, 0]
								} as Comment;
							} else {
								const commentLikesArray = comment.Likes;
								commentLikesArray.pop();

								return { ...comment, Likes: commentLikesArray };
							}
						} else {
							return comment;
						}
					})
				);

				if (likedComments.includes(commentId)) {
					setLikedComments(
						likedComments.filter((id: number) => {
							return id !== commentId;
						})
					);
				} else {
					setLikedComments([...likedComments, commentId]);
				}
			})
			.catch((error: any) => {
				toast.error(error.response.data.error, {
					theme: 'colored'
				});
			});
	};

	return {
		postObject,
		comments,
		newComment,
		setNewComment,
		likedComments,
		authState,
		getCurrentPost,
		getComments,
		addComment,
		deleteComment,
		deletePost,
		editPost,
		likeComment
	};
};

export default PostContainer;
