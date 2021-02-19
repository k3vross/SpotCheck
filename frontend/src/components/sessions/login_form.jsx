import React, { useState } from "react";
import * as sessionActions from "../../actions/session_actions"
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const processForm = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({
      email: email,
      password: password
    }))
  }

  return (
    <div>
      <form onSubmit={(e) => processForm(e)}>
        <input type="text" placeholder="email" value={email} onChange={({target: { value }}) => setEmail(value)}/>
        <input type="password" placeholder="password" value={password} onChange={({target: { value }}) => setPassword(value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;