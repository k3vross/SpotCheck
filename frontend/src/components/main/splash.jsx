import React from 'react'
import {Link} from 'react-router-dom';

const Splash = () => {
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>Sign up</Link>
    </div>
  )
}

export default Splash;

