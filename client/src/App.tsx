import React, { useEffect, useState } from 'react';
import './App.css';
import AuthenticationContainer from './containers/AuthenticationContainer';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Login from './components/Login';
import Registration from './components/Registration';


const App = (): JSX.Element => {
  const { authState, setAuthState, authenticate } = AuthenticationContainer();
	
	useEffect(() => {
    authenticate();
  }, []);

	
    return (
      <div className="app">
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
};

export default App;
