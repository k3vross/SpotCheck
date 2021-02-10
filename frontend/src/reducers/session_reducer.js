import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT, RECEIVE_USER_SIGN_UP } from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: !!action.payload,
        id: action.payload.user.id
      };
    case RECEIVE_USER_LOGOUT: 
      return {
        isAuthenticated: false, 
      }; 
    case RECEIVE_USER_SIGN_UP: 
      return {
        ...state, 
        isSignedIn: true
      };
    default:
      return state;
  }
} 