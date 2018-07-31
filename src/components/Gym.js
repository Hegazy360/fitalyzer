import React, {Component} from 'react'
import axios from 'axios'
import ExerciseForm from './ExerciseForm'
import ExerciseChart from './ExerciseChart'
import ExercisesTable from './ExercisesTable';
import ExercisesButtons from './ExercisesButtons';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import update from 'immutability-helper'

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      editingExerciseId: null,
      notification: '',
      exerciseDates: [],
      exerciseWeights: []
    };
  }
  addNewExercise = (exercise) => {
    axios.post('http://localhost:3001/api/v1/gyms/1/exercises', {exercise: exercise}).then(response => {
      const exercises = update(this.state.exercises, {
        $splice: [
          [this.state.exercises.length, this.state.exercises.length, response.data]
        ]
      })
      this.setState({exercises: exercises, editingExerciseId: null, fadeInAnimation: true})
    }).catch(error => console.log(error))
  }
  deleteExercise = (id) => {
    axios.delete(`http://localhost:3001/api/v1/exercises/${id}`)
    .then(response => {
      const exerciseIndex = this.state.exercises.findIndex(x => x.id === id)
      const exercises = update(this.state.exercises, { $splice: [[exerciseIndex, 1]]})
      this.setState({exercises: exercises})
    })
    .catch(error => console.log(error))
  }
  updateExercise = (exercise) => {
    const exerciseIndex = this.state.exercises.findIndex(x => x.id === exercise.id)
    const exercises = update(this.state.exercises, {
      [exerciseIndex]: {
        $set: exercise
      }
    })
    this.setState({exercises: exercises, notification: 'All changes saved'})
  }
  resetNotification = () => {
    this.setState({notification: ''})
  }
  enableEditing = (id) => {
    this.setState({editingExerciseId: id},
      () => { this.title.focus() })
  }
  toggleForm = () => {
    this.setState({editingExerciseId: 1})
  }
  filterExercisesBy = (exercisesArray, value) => {
    return groupBy(exercisesArray, value)
  }
  filterExercisesByDate = () => {
    return groupBy(this.state.exercises, (result) => moment(result.created_at).format("MMMM Do YYYY"));
  }
  setExerciseData = (id) => {
    const exercisesSet = this.filterExercisesBy(this.state.exercises, "exercise_id");
    this.setState({
      exerciseDates: exercisesSet[id].map(exercise => (moment(exercise.created_at).format("MMMM Do YYYY"))),
      exerciseWeights: exercisesSet[id].map(exercise => (exercise.weight))
    })
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/gyms/1/exercises').then(response => {
      this.setState({exercises: response.data})
    }).catch(error => console.log(error))
  }
  render() {
    const exercisesDates = Object.keys(this.filterExercisesByDate())
    const exercisesByDate = this.filterExercisesByDate()
    return (<div>
      {exercisesDates.map((key, index) => {
        return (
          <ExercisesTable key = {index} exercises = {exercisesByDate[key]} date = {key} fadeInAnimation = {this.state.fadeInAnimation} deleteExercise = {this.deleteExercise}/>
        );
      })}
      <Button variant="extendedFab" color= "primary" aria-label="Add" className="newExerciseButton" onClick={this.toggleForm}>
        <AddIcon />
        Add Exercise
      </Button>
      {this.state.editingExerciseId && <ExerciseForm addNewExercise={this.addNewExercise} resetNotification={this.resetNotification}/>}
      <span className="notification">
        {this.state.notification}
      </span>
      <ExercisesButtons exercisesIds = {Object.keys(this.filterExercisesBy(this.state.exercises,"exercise_id"))} setExerciseData = {this.setExerciseData}/>

      <ExerciseChart exerciseDates = {this.state.exerciseDates} exerciseWeights = {this.state.exerciseWeights} />
    </div>);
  }
}
export default Gym
