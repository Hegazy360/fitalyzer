import React, {Component} from 'react'
import axios from 'axios'
import ExerciseForm from './ExerciseForm'
import ExerciseChart from './ExerciseChart'
import ExercisesTable from './ExercisesTable';
import WorkoutCalendar from './WorkoutCalendar';
import ExercisesButtons from './ExercisesButtons';
import {Button} from 'semantic-ui-react'
import groupBy from 'lodash/groupBy'
import max from 'lodash/max'
import moment from 'moment'
import update from 'immutability-helper'
import Grid from '@material-ui/core/Grid';
import ExercisePersonalInfo from './ExercisePersonalInfo'

class Gym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      editingExerciseId: null,
      notification: '',
      exerciseDates: [],
      exerciseWeights: null,
      exercisesDates: null,
      exercisesByDate: [],
      activeWorkoutDate: null,
      activeExerciseSet: null
    };
  }
  addNewExercise = (exercise) => {
    console.log(exercise);
    axios.post('http://localhost:3001/api/v1/gyms/1/exercises', {exercise: exercise}).then(response => {
      const exercises = update(this.state.exercises, {
        $splice: [
          [this.state.exercises.length, this.state.exercises.length, response.data]
        ]
      })
      this.setState({exercises: exercises, editingExerciseId: null, fadeInAnimation: true})
      this.filterExercisesByDate()
    }).catch(error => console.log(error))
  }
  deleteExercise = (id) => {
    // TODO: immutate state
    axios.delete(`http://localhost:3001/api/v1/exercises/${id}`)
    .then(response => {
      const exerciseIndex = this.state.exercises.findIndex(x => x.id === id)
      const exercises = update(this.state.exercises, { $splice: [[exerciseIndex, 1]]})
      this.setState({exercises: exercises})
      this.filterExercisesByDate()
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
    const results = groupBy(this.state.exercises, (result) => new Date(result.created_at).setHours(0,0,0,0))
    this.setState({
      exercisesDates: Object.keys(results),
      exercisesByDate: results
    })
  }
  setExerciseData = (id) => {
    const exercisesSet = this.filterExercisesBy(this.state.exercises, "exercise_id");
    this.setState({
      activeExerciseSet: exercisesSet[id],
      exerciseDates: exercisesSet[id].map(exercise => (moment(exercise.created_at).format("MMMM Do YYYY"))),
      exerciseWeights: exercisesSet[id].map(exercise => (max(exercise.sets.map(set => (set.weight)))))
    })
  }

  handleDayClick = (date) => {
    this.setState({
      activeWorkoutDate: date,
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/gyms/1/exercises').then(response => {
      this.setState({exercises: response.data})
      this.filterExercisesByDate()
    }).catch(error => console.log(error))
  }
  render() {

    return (
      <Grid container spacing={32}>
        <Grid item xs={12} md={6}>
          {this.state.exercisesDates && <WorkoutCalendar exercisesDates = {this.state.exercisesDates} handleDayClick = {this.handleDayClick}/>}
        </Grid>
        <Grid item xs={12} md={6}>
          {this.state.activeWorkoutDate && <ExercisesTable exercises = {this.state.exercisesByDate[this.state.activeWorkoutDate]} date = {this.state.activeWorkoutDate} fadeInAnimation = {this.state.fadeInAnimation} deleteExercise = {this.deleteExercise}/>}
        </Grid>
        <br/>
        {
          !this.state.editingExerciseId &&
          <Grid item xs={12}>
            <center>
              <Button primary size="big" className="newExerciseButton" onClick={this.toggleForm} icon="plus" content="Add Exercise"/>
            </center>
          </Grid>
        }
        {
          this.state.editingExerciseId &&
          <Grid item xs={12}>
            <ExerciseForm addNewExercise={this.addNewExercise} resetNotification={this.resetNotification}/>
          </Grid>
        }
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={2}>
          {this.state.exercises.length > 0 && <ExercisesButtons exercisesIds = {Object.keys(this.filterExercisesBy(this.state.exercises,"exercise_id"))} setExerciseData = {this.setExerciseData}/>}
        </Grid>
        <Grid item xs={12} md={10}>
          {this.state.activeExerciseSet && <ExercisePersonalInfo activeExerciseSet = {this.state.activeExerciseSet} /> }
          {this.state.exerciseWeights && <ExerciseChart exerciseDates = {this.state.exerciseDates} exerciseWeights = {this.state.exerciseWeights} />}
        </Grid>
      </Grid>);
  }
}
export default Gym
