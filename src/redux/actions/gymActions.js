import axios from "axios";
import groupBy from 'lodash/groupBy'
import max from 'lodash/max'
import moment from 'moment'

export function fetchExercises() {
  return function(dispatch) {
    const response = dispatch({
      type: "FETCH_EXERCISES",
      payload: axios.get('https://fitalyzer-api.herokuapp.com/api/v1/gyms/1/exercises')
    })
    response.then((results) => {
      dispatch(filterExercisesByDate())
    })
  }
}

export function addExercise(exercise) {
  return function(dispatch) {
    const response = dispatch({
      type: "ADD_EXERCISE",
      payload: axios.post('https://fitalyzer-api.herokuapp.com/api/v1/gyms/1/exercises', {exercise: exercise})
    })
    response.then((results) => {
      dispatch(filterExercisesByDate())
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

export function filterExercisesByDate() {
  return function(dispatch) {
    dispatch({
      type: "FILTER_EXERCISES_BY_DATE",
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
  console.log(date);
  return function(dispatch) {
    dispatch({
      type: "SET_ACTIVE_WORKOUT_DATE",
      payload: date,
    })
  }
}

export function changeActiveButton(button_index) {
  return function(dispatch) {
    dispatch({
      type: "CHANGE_ACTIVE_BUTTON",
      payload: button_index,
    })
  }
}
