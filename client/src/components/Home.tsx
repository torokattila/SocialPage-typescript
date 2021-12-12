import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import { Post } from '../models/Post';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Home.css';
import Navbar from '../shared/Navbar';

const Home = (): JSX.Element => {
	const {
		listOfPosts,
		likedPosts,
		getPosts,
		likePost
	} = HomeContainer();

	let history = useHistory();

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			history.push('/login');
		} else {
			getPosts();
		}
	}, []);

	return (
		<div className="homePageContainer">
			<Navbar />
			{listOfPosts.length === 0
				? <div className="noPostsDiv">
						<p>Be the first,</p>
						<button
							className="homePageCreatePostButton"
							onClick={() => {
								history.push('/createpost');
							}}
						>
							create a post!
						</button>
					</div>
				: listOfPosts.map((post: Post) => {
						return (
							<div className="postDiv" key={post.id}>
								<div className="postTitle">
									{post.title}
								</div>

								<div
									className="postContent"
									onClick={() => {
										history.push(`/posts/${post.id}`);
									}}
								>
									{post.content}
								</div>

								<div className="postFooter">
									<div className="usernameDiv">
										<Link
											className="usernameLink"
											to={`/profile/${post.userId}`}
										>
											<span className="username">
												{post.username}
											</span>
										</Link>
									</div>

									<div className="postDate">
										{post.createdAt}
										<div className="commentCounterDiv">
											<ChatIcon
												className="commentsIcon"
												onClick={() => {
													history.push(
														`/posts/${post.id}`
													);
												}}
											/>
											<label>
												{post.Comments.length}
											</label>
										</div>

										<div className="likeButtons">
											{likedPosts.includes(post.id)
												? <FavoriteIcon
														className="likeButton"
														onClick={() =>
															likePost(post.id)}
													/>
												: <FavoriteBorderIcon
														className="likeButton"
														onClick={() =>
															likePost(post.id)}
													/>}
											<label>
												{post.Likes.length}
											</label>
										</div>
									</div>
								</div>
							</div>
						);
					})}
		</div>
	);
};

export default Home;
