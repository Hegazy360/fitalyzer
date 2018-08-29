import axios from "axios";

export function fetchExercise(exercise_id) {
  return function(dispatch) {
    dispatch({
      type: "FETCH_EXERCISE",
      payload: axios.get('https://wger.de/api/v2/exercise/' + exercise_id)
    })
  }
}

export function fetchAllExercises() {
  return function(dispatch) {
    dispatch({
      type: "FETCH_ALL_EXERCISES",
      payload: axios.get('https://wger.de/api/v2/exercise/?format=json&limit=350&language=2&status=2')
    })
  }
}

export function setMounted(mounted) {
  return function(dispatch) {
    dispatch({
      type: "SET_MOUNTED",
      payload: mounted
    })
  }
}

export function handleChange(selectedOption) {
  return function(dispatch) {
    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        selectedOption: selectedOption,
        exercise_id: selectedOption? selectedOption.value : '',
        name: selectedOption? selectedOption.label : ''
      }
    })
  }
}

export function handleInput(value) {
  return function(dispatch) {
    dispatch({
      type: "HANDLE_INPUT",
      payload: value
    })
  }
}

export function handleSets(id, value) {
  return function(dispatch) {
    dispatch({
      type: "HANDLE_SETS",
      payload: {
        id: id,
        value: value,
      }
    })
  }
}
