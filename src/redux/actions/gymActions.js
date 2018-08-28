import axios from "axios";
import groupBy from 'lodash/groupBy'
import max from 'lodash/max'
import moment from 'moment'

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

export function toggleForm() {
  return function(dispatch) {
    dispatch({
      type: "TOGGLE_FORM",
      payload: 1,
    })
  }
}

export function filterExercisesByDate(exercises) {
  const results = groupBy(exercises, (result) => new Date(result.created_at).setHours(0,0,0,0))
  return function(dispatch) {
    dispatch({
      type: "FILTER_EXERCISES_BY_DATE",
      payload: {
        exercisesDates: Object.keys(results),
        exercisesByDate: results
      },
    })
  }
}

export function setExerciseData(exercises, id) {
  const exercisesSet = groupBy(exercises, "exercise_id")
  return function(dispatch) {
    dispatch({
      type: "SET_EXERCISES_DATA",
      payload: {
        activeExerciseSet: exercisesSet[id],
        exerciseDates: exercisesSet[id].map(exercise => (moment(exercise.created_at).format("MMMM Do YYYY"))),
        exerciseWeights: exercisesSet[id].map(exercise => (max(exercise.sets.map(set => (set.weight)))))
      },
    })
  }
}

export function setActiveWorkoutDate(date) {
  return function(dispatch) {
    dispatch({
      type: "SET_ACTIVE_WORKOUT_DATE",
      payload: {
        activeWorkoutDate: date,
      },
    })
  }
}

export function changeActiveButton(button_index) {
  return function(dispatch) {
    dispatch({
      type: "CHANGE_ACTIVE_BUTTON",
      payload: {
        activeWorkoutDate: button_index,
      },
    })
  }
}
