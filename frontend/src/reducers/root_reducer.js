import { combineReducers } from 'redux';
import users from "./users_reducer";
import session from "./session_reducer";


const rootReducer = combineReducers({
  users,
  session
})

export default rootReducer