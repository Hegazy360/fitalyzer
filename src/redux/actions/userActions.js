import axios from "axios";

export function authenticateUser(email, password) {
  return function(dispatch) {
    const response = dispatch({
      type: "AUTHENTICATE_USER",
      payload: axios.post('http://localhost:3001/api/v1/user/token', {auth: {email: email,password: password}, headers: {"Access-Control-Allow-Origin": "*"}})
    })
    response.then((results) => {
      dispatch(getCurrentUser(results.value.data.jwt))
    })
  }
}

export function getCurrentUser(jwt) {
  var config = {
       headers: {}
     }
   if (jwt) {
     config['headers']['Authorization'] = 'Bearer ' + jwt
   }
  return function(dispatch) {
    dispatch({
      type: "GET_CURRENT_USER",
      payload: axios.get('http://localhost:3001/api/v1/users/1', config)
    })
  }
}
