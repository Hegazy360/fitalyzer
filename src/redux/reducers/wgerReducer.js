export default function reducer(state={
    exercises: [],
    fetching: false,
    fetched: false,
    error: null
  }, action) {

    switch (action.type) {
      //fetching all exercises
      case "FETCH_EXERCISE_PENDING": {
        return {...state, fetching: true, fetched: false}
      }
      case "FETCH_EXERCISE_REJECTED": {
        return {...state, fetching: false, fetched: false, error: action.payload.message}
      }
      case "FETCH_EXERCISE_FULFILLED": {
        return {...state, fetching: false, fetched: true, exercises: state.exercises.concat(action.payload.data)}
      }
      default: {
        return state
      }
    }
}
