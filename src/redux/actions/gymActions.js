import axios from "axios";

export function fetchExercises() {
  return function(dispatch) {
    dispatch({
      type: "FETCH_EXERCISES",
      payload: axios.get('https://fitalyzer-api.herokuapp.com/api/v1/gyms/1/exercises')
    })
  }
}

export function addExercise(exercise) {
  return function(dispatch) {
    dispatch({
      type: "ADD_EXERCISE",
      payload: axios.post('https://fitalyzer-api.herokuapp.com/api/v1/gyms/1/exercises', {exercise: exercise})
    })
  }
}

export function deleteExercise(exercise_id) {
  return function(dispatch) {
    dispatch({
      type: "DELETE_EXERCISE",
      payload: axios.delete(`https://fitalyzer-api.herokuapp.com/api/v1/exercises/${exercise_id}`, {exercise_id: exercise_id}),
    })
  }
}
