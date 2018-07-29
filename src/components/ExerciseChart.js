import React, {Component} from 'react'
import ReactEcharts from 'echarts-for-react';

const option = {
  xAxis: {
    type: 'category',
    data: [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [
        820,
        932,
        901,
        934,
        1290,
        1330,
        1320
      ],
      type: 'line'
    }
  ]
};

class ExerciseChart extends Component {

  render() {
    return (
      <div>
        <ReactEcharts option={option} notMerge={true} lazyUpdate={true} onChartReady={this.onChartReadyCallback} />
      </div>
  )
  }
}

export default ExerciseChart
