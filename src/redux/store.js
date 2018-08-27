import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import { composeWithDevTools } from 'redux-devtools-extension';
import * as gym from './actions/gymActions'

const middleware = applyMiddleware(promise(), thunk, logger)
const store = createStore(reducer, composeWithDevTools(middleware))

store.dispatch(gym.fetchExercises())
// store.dispatch(gym.addExercise({exercise_id: 12, name: "TESTWAHTSUP"}))
// store.dispatch(gym.deleteExercise(40))

export default store
