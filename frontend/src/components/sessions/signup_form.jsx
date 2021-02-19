import React, { useState } from "react";
import * as sessionActions from "../../actions/session_actions"
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const processForm = (e) => {
    e.preventDefault();
    dispatch(sessionActions.signup({
      userName: userName,
      email: email,
      name: name,
      password: password
    })).then((res) => {
      if (res.type === "RECEIVE_USER_SIGN_UP") {
        dispatch(sessionActions.login({
          email: email, 
          password: password
        }))
      }
    })
  }

  return (
    <div>
      <form onSubmit={(e) => processForm(e)}>
        <input type="text" placeholder="username" value={userName} onChange={({target: { value }}) => setUserName(value)}/>
        <input type="text" placeholder="email" value={email} onChange={({target: { value }}) => setEmail(value)}/>
        <input type="text" placeholder="name" value={name} onChange={({target: { value }}) => setName(value)}/>
        <input type="password" placeholder="password" value={password} onChange={({target: { value }}) => setPassword(value)}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm;



