import { combineReducers } from "redux"
import gym from "./gymReducer"
import wger from "./wgerReducer"
import user from "./userReducer"
import exerciseForm from "./exerciseFormReducer"

export default combineReducers({
  gym,
  wger,
  user,
  exerciseForm,
})
