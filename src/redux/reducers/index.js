import { combineReducers } from "redux"
import gym from "./gymReducer"
import wger from "./wgerReducer"
import user from "./userReducer"
import exerciseForm from "./exerciseFormReducer"
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  gym,
  wger,
  user,
  exerciseForm,
  form: formReducer
})
