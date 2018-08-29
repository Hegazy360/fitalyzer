import groupBy from 'lodash/groupBy'

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
    activeExerciseButton: 0,
    fetching: false,
    fetched: false,
    adding: false,
    added: false,
    error: null,
  }, action) {

    switch (action.type) {
      //fetching all exercises
      case "FETCH_EXERCISES_PENDING": {
        return {...state, fetching: true}
      }
      case "FETCH_EXERCISES_REJECTED": {
        return {...state, fetching: false, error: action.payload.message}
      }
      case "FETCH_EXERCISES_FULFILLED": {
        return {...state, fetching: false, fetched: true, exercises: action.payload.data}
      }
      //adding new exercise
      case "ADD_EXERCISE_PENDING": {
        return {...state, adding: true}
      }
      case "ADD_EXERCISE_REJECTED": {
        return {...state, adding: false, error: action.payload.message}
      }
      case "ADD_EXERCISE_FULFILLED": {
        return {...state, adding: false, added: true, exercises: state.exercises.concat(action.payload.data)}
      }
      //deleting exercise
      case "DELETE_EXERCISE_REJECTED": {
        return {...state, error: action.payload.message}
      }
      case "DELETE_EXERCISE_FULFILLED": {
        // TODO: find a better way to get exercise_id by returning a json from the API
        return {...state, exercises: state.exercises.filter(exercise => exercise.id !== action.payload.config.exercise_id)}
      }
      case "TOGGLE_FORM": {
        return {...state, editingExerciseId: action.payload}
      }
      case "FILTER_EXERCISES_BY_DATE": {
        const results = groupBy(state.exercises, (result) => new Date(result.created_at).setHours(0,0,0,0))
        return {...state, exercisesDates: Object.keys(results), exercisesByDate: results, editingExerciseId: 0}
      }
      case "SET_EXERCISES_DATA": {
        return {...state, activeExerciseSet: action.payload.activeExerciseSet, exerciseDates: action.payload.exerciseDates, exerciseWeights: action.payload.exerciseWeights}
      }
      case "CHANGE_ACTIVE_BUTTON": {
        return {...state, activeExerciseButton: action.payload}
      }
      case "SET_ACTIVE_WORKOUT_DATE": {
        return {...state, activeWorkoutDate: action.payload}
      }
      default: {
        return state
      }
    }
}
