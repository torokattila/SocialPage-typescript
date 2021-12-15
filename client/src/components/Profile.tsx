import { Tooltip } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import ProfileContainer from '../containers/ProfileContainer';
import Navbar from '../shared/Navbar';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import './Profile.css';
import { useHistory} from 'react-router-dom';
import { Post } from '../models/Post';
import PostCard from '../shared/PostCard';

const Profile = (): JSX.Element => {
	const { username, listOfPosts, authState, getUser } = ProfileContainer();
    const history = useHistory();

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="profilePageContainer">
			<Navbar />
			<div className="basicInfoContainer">
				<h2>
					Username: {username}
					{authState.username === username &&
						<Tooltip title="Edit credentials">
							<EditOutlinedIcon
								className="editCredentialsIcon"
								onClick={() => {
									history.push('/changecredentials');
								}}
							/>
						</Tooltip>}
				</h2>
			</div>

			<div className="userPostsTitleDiv">
				<h2>
					{username}'s posts:
				</h2>
			</div>

            <div className="listOfUserPosts">
                {listOfPosts && listOfPosts.map((post: Post) => {
                    return (
                        <PostCard 
                            currentPost={post}
                            isProfile={true}
                        />
                    )
                })}
            </div>
		</div>
	);
};

export default Profile;
