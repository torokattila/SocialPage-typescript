import React, { useEffect, useState } from 'react';
import './App.css';
import AuthenticationContainer from './containers/AuthenticationContainer';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';


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
              </Switch>
            </Router>
          </AuthContext.Provider>
      </div>
    )
  }
    
};

export default App;
