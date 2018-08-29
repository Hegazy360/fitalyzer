import React, {Component} from 'react'
import ExerciseForm from './ExerciseForm'
import ExerciseChart from './ExerciseChart'
import ExercisesTable from './ExercisesTable';
import WorkoutCalendar from './WorkoutCalendar';
import ExercisesButtons from './ExercisesButtons';
import {Button} from 'semantic-ui-react'
import groupBy from 'lodash/groupBy'
import Grid from '@material-ui/core/Grid';
import ExercisePersonalInfo from './ExercisePersonalInfo'
import { connect } from 'react-redux'
import * as gym from '../redux/actions/gymActions'

const mapStateToProps = store => {
  return {
    exercises: store.gym.exercises,
    editingExerciseId: store.gym.editingExerciseId,
    exerciseDates: store.gym.exerciseDates,
    exerciseWeights: store.gym.exerciseWeights,
    exercisesDates: store.gym.exercisesDates,
    exercisesByDate: store.gym.exercisesByDate,
    activeWorkoutDate: store.gym.activeWorkoutDate,
    activeExerciseSet: store.gym.activeExerciseSet,
    activeExerciseButton: store.gym.activeExerciseButton
  }
}

class Gym extends Component {
  addNewExercise = (exercise) => {
    this.props.addExercise(exercise)
  }
  deleteExercise = (id) => {
    this.props.deleteExercise(id);
  }
  toggleForm = () => {
    this.props.toggleForm()
  }
  filterExercisesBy = (exercisesArray, value) => {
    return groupBy(exercisesArray, value)
  }
  setExerciseData = (id) => {
    this.props.setExerciseData(this.props.exercises, id)
  }
  handleDayClick = (date) => {
    this.props.setActiveWorkoutDate(date)
  }
  componentDidMount() {
    this.props.fetchExercises()
  }
  render() {
    return (
      <Grid container spacing={32}>
        <Grid item xs={12} md={6}>
          {this.props.exercisesDates && <WorkoutCalendar exercisesDates = {this.props.exercisesDates} handleDayClick = {this.handleDayClick}/>}
        </Grid>
        <Grid item xs={12} md={6}>
          {this.props.activeWorkoutDate && <ExercisesTable exercises = {this.props.exercisesByDate[this.props.activeWorkoutDate]} date = {this.props.activeWorkoutDate} fadeInAnimation = {this.props.fadeInAnimation} deleteExercise = {this.deleteExercise}/>}
        </Grid>
        <br/>
        {
          !this.props.editingExerciseId &&
          <Grid item xs={12}>
            <center>
              <Button primary size="big" className="newExerciseButton" onClick={this.toggleForm} icon="plus" content="Add Exercise"/>
            </center>
          </Grid>
        }
        {
          this.props.editingExerciseId === 1 &&
          <Grid item xs={12}>
            <ExerciseForm addNewExercise={this.addNewExercise} />
          </Grid>
        }
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={2}>
          {this.props.exercises.length > 0 && <ExercisesButtons changeActiveButton={this.props.changeActiveButton}  activeExerciseButton = {this.props.activeExerciseButton} exercisesIds = {Object.keys(this.filterExercisesBy(this.props.exercises,"exercise_id"))} setExerciseData = {this.setExerciseData}/>}
        </Grid>
        <Grid item xs={12} md={10}>
          {this.props.activeExerciseSet && <ExercisePersonalInfo activeExerciseSet = {this.props.activeExerciseSet} /> }
          {this.props.exerciseWeights && <ExerciseChart exerciseDates = {this.props.exerciseDates} exerciseWeights = {this.props.exerciseWeights} />}
        </Grid>
      </Grid>);
  }
}
export default connect(mapStateToProps, gym)(Gym)
