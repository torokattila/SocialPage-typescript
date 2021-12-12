import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { Like } from '../models/Like';
import { Post } from '../models/Post';

const HomeContainer = () => {
	const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
	const [likedPosts, setLikedPosts] = useState<number[]>([]);

	const getPosts = async () => {
		await axios
			.get('http://localhost:3001/posts', {
				headers: {
					accessToken: localStorage.getItem('accessToken')!
				}
			})
			.then((response: AxiosResponse) => {
				setListOfPosts(response.data.listOfPosts);
				setLikedPosts(
					response.data.likedPosts.map((like: Like) => {
						return like.postId;
					})
				);
			})
			.catch((error: AxiosError) => {
				console.log(error);
			});
	};

	const likePost = async (postId: number) => {
		await axios
			.post(
				'http://localhost:3001/like',
				{
					postId
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')!
					}
				}
			)
			.then((response: AxiosResponse) => {
				setListOfPosts(
					listOfPosts.map(post => {
						if (post.id === postId) {
							if (response.data.isLiked) {
								return { ...post, Likes: [...post.Likes] };
							} else {
								const likesArray = post.Likes;
								likesArray.pop();

								return { ...post, Likes: likesArray };
							}
						} else {
							return post;
						}
					})
				);

				if (likedPosts.includes(postId)) {
					setLikedPosts(
						likedPosts.filter(id => {
							return id !== postId;
						})
					);
				} else {
					setLikedPosts([...likedPosts, postId]);
				}
			});
	};

	return {
		listOfPosts,
		setListOfPosts,
		likedPosts,
		setLikedPosts,
        getPosts,
        likePost,
	};
};

export default HomeContainer;
