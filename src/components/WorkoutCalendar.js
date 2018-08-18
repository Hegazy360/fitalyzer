import React, {Component} from 'react'
import Calendar from 'react-calendar';
import includes from 'lodash/includes'
import './css/ExercisesCalendar.css';

class WorkoutCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: this.props.exercisesDates
    }
  }

  render() {
    const dates = this.props.exercisesDates
    return (
      <div>
        <Calendar activeStartDate = {new Date()} calendarType = "ISO 8601" onClickDay = {(value) => console.log(value)} tileClassName = {({ date, view }) => includes(dates, date.getTime().toString())? 'training-day' : null}/>
      </div>
    )
  }
}

export default WorkoutCalendar
