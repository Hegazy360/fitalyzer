import React, {Component} from 'react'
import axios from 'axios'
import ExerciseForm from './ExerciseForm'
import ExerciseChart from './ExerciseChart'
import ExercisesTable from './ExercisesTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import orderBy from 'lodash/orderBy'
import moment from 'moment'
import update from 'immutability-helper'

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      editingExerciseId: null,
      notification: '',
      fadeInAnimation: false
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
  filterExercisesBy = (value) => {
    console.log(value)
    console.log(groupBy(this.state.exercises, value))
    return groupBy(this.state.exercises, value)
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/gyms/1/exercises').then(response => {
      this.setState({exercises: response.data})
    }).catch(error => console.log(error))
  }
  render() {
    return (<div>
      <ExercisesTable exercises = {this.state.exercises} fadeInAnimation = {this.state.fadeInAnimation} deleteExercise = {this.deleteExercise}/>
      <Button variant="extendedFab" color= "primary" aria-label="Add" className="newExerciseButton" onClick={this.toggleForm}>
        <AddIcon />
        Add Exercise
      </Button>
      {this.state.editingExerciseId && <ExerciseForm addNewExercise={this.addNewExercise} resetNotification={this.resetNotification}/>}
      <span className="notification">
        {this.state.notification}
      </span>
      {console.log(groupBy(this.state.exercises, "exercise_id"))}
      {console.log(groupBy(this.state.exercises, (result) => moment(result.created_at).startOf('isoWeek')))};
      <ExerciseChart />
    </div>);
  }
}
export default Gym
