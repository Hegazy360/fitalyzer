import update from 'immutability-helper'

export default function reducer(state={
    exercises: [],
    fetching: false,
    fetched: false,
    error: null,
    exercise_id: null,
    name: '',
    setsDone: 0,
    sets: [],
    selectedOption: '',
    isSelectLoading: true,
    options: [],
    mounted: false
  }, action) {

    switch (action.type) {
      //fetching all exercises
      case "FETCH_EXERCISE_PENDING": {
        return {...state, fetched: false}
      }
      case "FETCH_EXERCISE_REJECTED": {
        return {...state, error: action.payload.message}
      }
      case "FETCH_EXERCISE_FULFILLED": {
        return {...state, exercises: state.exercises.concat(action.payload.data)}
      }
      case "FETCH_ALL_EXERCISES_PENDING": {
        return {...state, fetching: true, fetched: false}
      }
      case "FETCH_ALL_EXERCISES_REJECTED": {
        return {...state, fetching: false, fetched: false, error: action.payload.message}
      }
      case "FETCH_ALL_EXERCISES_FULFILLED": {
        return {...state, fetching: false, fetched: true, isSelectLoading: false, options: action.payload.data.results.map(result => ({label: result.name, value: result.id}))}
      }
      case "SET_MOUNTED": {
        return {...state, mounted: action.payload}
      }
      case "HANDLE_CHANGE": {
        return {...state, selectedOption: action.payload.selectedOption, exercise_id: action.payload.exercise_id, name: action.payload.name}
      }
      case "HANDLE_INPUT": {
        return {...state, setsDone: action.payload}
      }
      case "HANDLE_SETS": {
        return {...state, sets: update(state.sets, {[action.payload.id]: {  $set: action.payload.value}})}
      }
      default: {
        return state
      }
    }
}
