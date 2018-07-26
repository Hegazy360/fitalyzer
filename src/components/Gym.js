import React, {Component} from 'react'
import axios from 'axios'
import Exercise from './Exercise'
import ExerciseForm from './ExerciseForm'
import ExercisesTable from './ExercisesTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Transition } from 'react-spring'
import update from 'immutability-helper'
class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      editingExerciseId: null,
      notification: ''
    };
  }
  addNewExercise = () => {
    axios.post('http://localhost:3001/api/v1/gyms/1/exercises', {
      exercise: {
        name: '',
        exercise_id: null,
        weight: null,
        sets: null,
        reps: null
      }
    }).then(response => {
      console.log(response.data)
      const exercises = update(this.state.exercises, {
        $splice: [
          [this.state.exercises.length, this.state.exercises.length, response.data]
        ]
      })
      this.setState({exercises: exercises, editingExerciseId: response.data.id})
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
  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/gyms/1/exercises').then(response => {
      console.log(response)
      this.setState({exercises: response.data})
    }).catch(error => console.log(error))
  }
  render() {
    return (<div>
      <ExercisesTable exercises = {this.state.exercises} />
      <Button variant="extendedFab" color= "primary" aria-label="Add" className="newExerciseButton" onClick={this.addNewExercise}>
        <AddIcon />
        Add Exercise
      </Button>
      {this.state.editingExerciseId && <ExerciseForm exercise={this.state.exercises[this.state.exercises.findIndex(x => x.id === this.state.editingExerciseId)]} key={this.state.editingExerciseId} updateExercise={this.updateExercise} resetNotification={this.resetNotification} titleRef= {input => this.title = input}/>}
      <span className="notification">
        {this.state.notification}
      </span>
    </div>);
  }
}
export default Gym
