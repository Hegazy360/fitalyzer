import { combineReducers } from "redux"
import gym from "./gymReducer"
import wger from "./wgerReducer"

export default combineReducers({
  gym,
  wger
})
