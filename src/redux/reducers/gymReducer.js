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
        console.log("HEEEEEEEEEEY "+action.payload);
        return {...state, error: action.payload.message}
      }
      case "DELETE_EXERCISE_FULFILLED": {
        // TODO: find a better way to get exercise_id by returning a json from the API
        return state.exercises.filter(exercise => exercise.id !== action.payload.config.exercise_id)
      }
      case "TOGGLE_FORM": {
        return {...state, editingExerciseId: action.payload}
      }
      case "FILTER_EXERCISES_BY_DATE": {
        return {...state, exercisesDates: action.payload.exercisesDates, exercisesByDate: action.payload.exercisesByDate}
      }
      case "SET_EXERCISES_DATA": {
        return {...state, activeExerciseSet: action.payload.activeExerciseSet, exerciseDates: action.payload.exerciseDates, exerciseWeights: action.payload.exerciseWeights}
      }
      case "CHANGE_ACTIVE_BUTTON": {
        return {...state, activeExerciseButton: action.payload}
      }
      default: {
        return state
      }
    }
}
