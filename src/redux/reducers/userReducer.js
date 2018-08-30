export default function reducer(state={
    current_user: null,
    jwt: null,
  }, action) {

    switch (action.type) {
      case "AUTHENTICATE_USER_FULFILLED": {
        return {...state, jwt: action.payload.data.jwt}
      }
      case "GET_CURRENT_USER_FULFILLED": {
        return {...state, current_user: action.payload.data}
      }
      default: {
        return state
      }
    }
}
