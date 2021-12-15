import { Link, useHistory } from 'react-router-dom';
import { Post } from '../models/Post';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';

type PostCardProps = {
	currentPost: Post;
	likedPosts?: number[];
	isProfile: boolean;
	likePost?: (postId: number) => Promise<void>;
};

const PostCard = ({
	currentPost,
	likedPosts,
	isProfile,
	likePost
}: PostCardProps): JSX.Element => {
	let history = useHistory();

	return (
		<div className="postDiv" key={currentPost.id}>
			<div className="postTitle">
				{currentPost.title}
			</div>

			<div
				className="postContent"
				onClick={() => {
					history.push(`/posts/${currentPost.id}`);
				}}
			>
				{currentPost.content}
			</div>

			<div className="postFooter">
				<div className="usernameDiv">
					<Link
						className="usernameLink"
						to={`/profile/${currentPost.userId}`}
					>
						<span className="username">
							{currentPost.username}
						</span>
					</Link>
				</div>

				<div className="postDate">
					{moment(currentPost.createdAt).format('YYYY-MM-DD')}
					<div className="commentCounterDiv">
						<ChatIcon
							className="commentsIcon"
							onClick={() => {
								history.push(`/posts/${currentPost.id}`);
							}}
						/>
						<label>
							{currentPost.Comments.length}
						</label>
					</div>

					{!isProfile
						? <div className="likeButtons">
								{likedPosts && likedPosts.includes(currentPost.id)
									? <FavoriteIcon
											className="likeButton"
											onClick={() =>
												likePost &&
												likePost(currentPost.id)}
										/>
									: <FavoriteBorderIcon
											className="likeButton"
											onClick={() =>
												likePost &&
												likePost(currentPost.id)}
										/>}
								<label>
									{currentPost.Likes.length}
								</label>
							</div>
						: <div className="likeButtons">
								<FavoriteIcon className="likeButton" />
								<label>
									{currentPost.Likes.length}
								</label>
							</div>}
				</div>
			</div>
		</div>
	);
};

export default PostCard;
