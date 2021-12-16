import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import { Post } from '../models/Post';
import './Home.css';
import Navbar from '../shared/Navbar';
import PostCard from '../shared/PostCard';

const Home = (): JSX.Element => {
	const { listOfPosts, likedPosts, getPosts, likePost } = HomeContainer();

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
							<PostCard
								key={post.id}
								isProfile={false}
								currentPost={post}
								likedPosts={likedPosts}
								likePost={() => likePost(post.id)}
							/>
						);
					})}
		</div>
	);
};

export default Home;
