import * as SessionAPIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT"
export const RECEIVE_USER_SIGN_UP = "RECEIVE_USER_SIGN_UP";

export const receiveCurrentUser = payload => {
  return ({
    type: RECEIVE_CURRENT_USER,
    payload
  })
};

export const receiveUserSignUp = () => {
  return ({
    type: RECEIVE_USER_SIGN_UP
  })
};

export const receiveSessionErrors = (errors) => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  })
};

export const receiveUserLogout = () => {
  return({
    type: RECEIVE_USER_LOGOUT
  })
};

export const signup = user => dispatch => {
  return SessionAPIUtil.signup(user)
    .then(() => dispatch(receiveUserSignUp()),
    (err) => dispatch(receiveSessionErrors(err.response.data))
    );
}

export const login = (user) => dispatch => {
  return SessionAPIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SessionAPIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    }, (err) => {
      dispatch(receiveSessionErrors(err.response.data));
    });
}

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  SessionAPIUtil.setAuthToken(false);
  dispatch(receiveUserLogout());
}


