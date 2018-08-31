import axios from "axios";

export function authenticateUser(values) {
  return function(dispatch) {
    console.log(values);
    const response = dispatch({
      type: "AUTHENTICATE_USER",
      payload: axios.post('https://fitalyzer-api.herokuapp.com/api/v1/user/token', {auth: {email: values.email, password: values.password}, headers: {"Access-Control-Allow-Origin": "*"}})
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
      payload: axios.get('https://fitalyzer-api.herokuapp.com/api/v1/users/1', config)
    })
  }
}

export function disconnectUser() {
  return function(dispatch) {
    dispatch({
      type: "DISCONNECT_USER"
    })
  }
}
