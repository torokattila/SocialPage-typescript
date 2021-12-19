import { useEffect } from 'react';
import './App.css';
import AuthenticationContainer from './containers/AuthenticationContainer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import ChangeCredentials from './components/ChangeCredentials';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Post from './components/Post';
import PageNotFound from './components/PageNotFound';


const App = (): JSX.Element => {
  const { authState, setAuthState, authenticate } = AuthenticationContainer();
	
	useEffect(() => {
    authenticate();
  }, []);

	
  if (!authState.status) {
    return (
      <div className="App">
        <AuthContext.Provider value={{authState, setAuthState}}>
          <Router>
            <Switch>
              <>
                <Login />
                <Route exact path='/login' component={Login} />
                <Route exact path='/registration' component={Registration} />
              </>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </div>
    )
  } else {
    return (
      <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState}}>
            <Router>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/changecredentials' component={ChangeCredentials} />
                <Route exact path='/posts/:id' component={Post} />
                <Route exact path='/createpost' component={CreatePost} />
                <Route exact path='/profile/:id' component={Profile} />
                <Route exact path='*' component={PageNotFound} />
              </Switch>
            </Router>
          </AuthContext.Provider>
      </div>
    )
  }
    
};

export default App;
