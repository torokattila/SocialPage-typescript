import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthenticationContainer from '../containers/AuthenticationContainer';
import { AuthContext } from '../helpers/AuthContext';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './Navbar.css';
import NavbarContainer from '../containers/NavbarContainer';

const Navbar = (): JSX.Element => {
	const history = useHistory();
	const { authenticate } = AuthenticationContainer();
	const { logout } = NavbarContainer();
	const { authState } = useContext(AuthContext);

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			history.push('/login');
		} else {
			authenticate();
		}
	}, []);

	return (
		<div className="navbar">
			<div className="nameAndLogout">
				<div>
					<h1
						onClick={() => {
							history.push('/changecredentials');
						}}
					>
						{authState.username}
					</h1>
				</div>

				<div>
					<button className="logoutButton" onClick={logout}>
						Logout
					</button>
				</div>
			</div>

			<div className="homeAndCreatePost">
				<div>
					<HomeIcon
						fontSize="large"
						className="homeIcon"
						onClick={() => {
							history.push('/');
						}}
					/>
					<Link className="links" to="/">
						Home Page
					</Link>
				</div>

				<div>
					<PostAddIcon
						fontSize="large"
						className="homeIcon"
						onClick={() => {
							history.push('/createpost');
						}}
					/>
					<Link className="links" to="/createpost">
						Create a Post
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
