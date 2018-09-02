import * as AuthService from '../../utils/AuthService';

export default function reducer(state={
    isAuthenticated: !AuthService.isTokenExpired(),
    isFetching: false,
    profile: AuthService.getProfile(),
    error: null
  }, action) {

    switch (action.type) {
      case "LOGIN_REQUEST":
        return {
          ...state,
          isFetching: true,
          error: null
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isFetching: false,
          isAuthenticated: true,
          profile: action.payload.profile
        };
      case "LOGIN_ERROR":
        return {
          ...state,
          isFetching: false,
          isAuthenticated: false,
          profile: {},
          error: action.error
        };
      case "LOGOUT_SUCCESS":
        return {
          ...state,
          isAuthenticated: false,
          profile: {}
        };
      default: {
        return state
      }
    }
}
