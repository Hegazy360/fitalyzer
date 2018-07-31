import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react';
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import moment from 'moment'

class ExerciseChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
  }

  getOptions = () => {
    const exercise_ids = Object.keys(this.props.filterExercisesBy(this.props.exercises,"exercise_id"))
    const exercises_dates = this.props.exercises.map(exercise => (moment(exercise.created_at).format("MMMM Do YYYY")))
    const exercises_weight = this.props.exercises.map(exercise => (exercise.weight))
    const options = {
      title: {
        text: 'Bench Press'
      },
      xAxis: {
        type: 'category',
        data: exercises_dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: exercises_weight,
          type: 'line'
        }
      ]
    };
    return options;
  }
  render() {
    return (
      <div>
        <ReactEcharts option={this.getOptions()} notMerge={true} lazyUpdate={true} onChartReady={this.onChartReadyCallback} />
      </div>
  )
  }
}

export default ExerciseChart
