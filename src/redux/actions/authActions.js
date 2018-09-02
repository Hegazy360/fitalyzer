export const loginRequest = () => ({
  type: "LOGIN_REQUEST"
});

export const loginSuccess = profile => ({
  type: "LOGIN_SUCCESS",
  payload: { profile }
});

export const loginError = error => ({
  type: "LOGIN_ERROR",
  error
});

export const logoutSuccess = () => ({
  type: "LOGOUT_SUCCESS"
});
