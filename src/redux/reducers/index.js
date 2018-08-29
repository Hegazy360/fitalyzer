import { combineReducers } from "redux"
import gym from "./gymReducer"
import wger from "./wgerReducer"
import exerciseForm from "./exerciseFormReducer"

export default combineReducers({
  gym,
  wger,
  exerciseForm
})
