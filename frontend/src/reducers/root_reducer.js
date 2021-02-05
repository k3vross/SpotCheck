import { combineReducers } from 'redux';
import usersReducer from "./users_reducer";
import sessionReducer from "./session_reducer";


const rootReducer = combineReducers({
  usersReducer,
  sessionReducer
})

export default rootReducer