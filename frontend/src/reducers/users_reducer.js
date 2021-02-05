import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default function(oldState = {}, action) {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {[action.currentUser._id]: action.currentUser};
    default:
      return oldState;
  }
}