export default function reducer(state={
    exercises: [],
    editingExerciseId: null,
    notification: '',
    exerciseDates: [],
    exerciseWeights: null,
    exercisesDates: null,
    exercisesByDate: [],
    activeWorkoutDate: null,
    activeExerciseSet: null,
    fetching: false,
    fetched: false,
    adding: false,
    added: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_EXERCISES_PENDING": {
        return {...state, fetching: true}
      }
      case "FETCH_EXERCISES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_EXERCISES_FULFILLED": {
        return {...state, fetching: false, fetched: true, exercises: action.payload.data}
      }
      case "ADD_EXERCISE_PENDING": {
        return {...state, adding: true}
      }
      case "ADD_EXERCISE_REJECTED": {
        return {...state, adding: false, error: action.payload}
      }
      case "ADD_EXERCISE_FULFILLED": {
        return {...state, adding: false, added: true, exercises: state.exercises.concat(action.payload)}
      }
      default: {
        return state
      }
    }
}
