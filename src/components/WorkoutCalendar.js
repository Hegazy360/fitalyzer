import React, {Component} from 'react'
import Calendar from 'react-calendar';
import includes from 'lodash/includes'
import dumbbell from '../images/dumbbell.svg';
import './css/ExercisesCalendar.css';

class WorkoutCalendar extends Component {

  componentDidMount() {
    this.props.handleDayClick(this.props.exercisesDates[this.props.exercisesDates.length - 1])
  }

  render() {
    const dates = this.props.exercisesDates
    return (
      <div>
        <Calendar tileContent={({ date, view }) => includes(dates, date.getTime().toString())? <img alt = "Dumbbell" className="dumbbell" src={dumbbell}/> : null} value={new Date(Number(dates[dates.length - 1]))} calendarType = "ISO 8601" tileDisabled = {({date, view }) => !includes(dates, date.getTime().toString())} onClickDay = {(value) => this.props.handleDayClick(value.getTime())} tileClassName = {({ date, view }) => includes(dates, date.getTime().toString())? 'training-day' : null}/>
    </div>
    )
  }
}

export default WorkoutCalendar
