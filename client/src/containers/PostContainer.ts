import axios, { Axios, AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../helpers/AuthContext';
import { Comment } from '../models/Comment';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { ParamTypes } from './ProfileContainer';

type CommentToAddType = {
    content: string;
    username: string;
    Likes: Like[];
}

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
					response.data.likedComments.map((likedComment: Comment) => {
						return likedComment.id;
					})
				);
			});
	};

	const addComment = async () => {
		await axios.post(
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
                    Likes: [],
                };

                setComments([...comments, commentToAdd] as Comment[]);
                setNewComment('');
                window.location.reload();
            }
        })
	};

	return {
		postObject,
		comments,
		newComment,
		likedComments,
		authState,
		getCurrentPost,
		getComments,
        addComment
	};
};

export default PostContainer;
