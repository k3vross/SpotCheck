import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/main/dashboard';
import Splash from './components/main/splash';
import LoginForm from './components/sessions/login_form';
import SignUpForm from "./components/sessions/signup_form";
import {AuthRoute, ProtectedRoute } from './util/route_util';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to SpotCheck
        </p>
        <Switch>
          <AuthRoute exact path="/" component={Splash} />
          <AuthRoute exact path="/signup" component={SignUpForm} />
          <AuthRoute exact path="/login" component={LoginForm} />

          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
