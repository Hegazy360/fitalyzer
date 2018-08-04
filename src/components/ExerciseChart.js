import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react';

class ExerciseChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
  }

  getOptions = () => {
    const options = {
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        data: this.props.exerciseDates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.props.exerciseWeights,
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
