import { Tooltip } from '@material-ui/core';
import PostContainer from '../containers/PostContainer';
import Navbar from '../shared/Navbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Post.css';
import moment from 'moment';
import { Comment } from '../models/Comment';
import { useEffect } from 'react';

const Post = (): JSX.Element => {
    const {
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
    } = PostContainer();

    useEffect(() => {
        getCurrentPost();
        getComments();
    }, []);

    return (
        <div className="postPageContainer">
            <Navbar />
            <div className="postCommentContainer">
                <div className="leftSide">
                    <div className="postDiv">
                        <div 
                            className="postTitle"
                            onClick={() => {
                                if (authState.username === postObject?.username) {
                                    editPost('title');
                                }
                            }}
                            >
                                {postObject?.title}
                                {authState.username === postObject?.username && 
                                <Tooltip title='Edit post title'>
                                    <EditOutlinedIcon className="editTitleIcon" />
                                </Tooltip>}
                        </div>

                        <div 
                            className="postContent"
                            onClick={() => {
                                if (authState.username === postObject?.username) {
                                    editPost('content');
                                }
                            }}
                        >
                            {authState.username === postObject?.username && 
                            <Tooltip title='Edit post content'>
                                <EditOutlinedIcon className='editContentIcon' />
                            </Tooltip>}
                            {postObject?.content}
                        </div>

                        <div className="postFooter">
                            <div className="usernameDiv">
                                <span className="username">
                                    {postObject?.username}
                                </span>
                            </div>

                            <div className="postDate">
                                {moment(postObject?.createdAt).format('YYYY-MM-DD')}
                            </div>

                            {authState.username === postObject?.username && 
                            <div className="likeButtons">
                                <DeleteIcon 
                                    className='likeButton'
                                    onClick={() => {
                                        deletePost(postObject.id)
                                    }}
                                />
                            </div>}
                        </div>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="addCommentContainer">
                        <h2>Add comment to this post:</h2>

                        <input
                            type="text"
                            className="commentInput"
                            placeholder="E.g. Nice post!"
                            autoComplete="off"
                            value={newComment}
                            onChange={event => {
                                setNewComment(event.target.value);
                            }}
                        />

                        <div>
                            <button
                                className="addCommentButton"
                                onClick={addComment}
                            >
                                Comment
                            </button>
                        </div>
                    </div>

                    <div className="listOfComments">
                        {comments && comments.map((comment: Comment) => {
                            return (
                                <div key={comment.id} className="commentCard">
                                    {authState.username === comment.username && 
                                    <div 
                                        className="deleteCommentIcon"
                                        onClick={() => {
                                            deleteComment(comment.id)
                                        }}>
                                            <span>X</span>
                                    </div>}
                                    <div className="commentContent">
                                        <span>
                                            {comment.content}
                                        </span>
                                    </div>

                                    <div className="commentFooter">
                                        <div>
                                            <span>
                                                {comment.username}
                                            </span>
                                        </div>

                                        <div className="commentLikeButtonDiv">
                                            {console.log(likedComments)}
                                            {likedComments.includes(comment.id) ? 
                                            <FavoriteIcon 
                                                className="commentLikeButton"
                                                onClick={() => {
                                                    likeComment(comment.id);
                                                }}
                                            />
                                        : <FavoriteBorderIcon 
                                            className="commentLikeButton"
                                            onClick={() => {
                                                likeComment(comment.id);
                                            }}
                                        />}
                                        <label>
                                            {comment.Likes.length}
                                        </label>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;