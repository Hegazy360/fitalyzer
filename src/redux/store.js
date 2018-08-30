import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./reducers"
import * as user from "./actions/userActions"

const middleware = applyMiddleware(promise(), thunk, logger)
const store = createStore(reducer, middleware)

store.dispatch(user.authenticateUser('mohamed@gmail.com', 'password'))

export default store
