import axios from "axios";

export function fetchExercise(exercise_id) {
  return function(dispatch) {
    dispatch({
      type: "FETCH_EXERCISE",
      payload: axios.get('https://wger.de/api/v2/exercise/' + exercise_id)
    })
  }
}
