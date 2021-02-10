import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default function(oldState = {}, action) {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState[action.payload.user.id] = action.payload.user; 
      return newState; 
      // return {[action.payload.user._id]: action.payload.user};
    default:
      return oldState;
  }
}