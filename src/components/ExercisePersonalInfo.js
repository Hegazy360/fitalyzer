import React, {Component} from 'react';
import maxBy from 'lodash/maxBy'
import { Statistic } from 'semantic-ui-react'
import './css/ExercisesTable.scss';

class ExercisePersonalInfo extends Component {
  render() {
    const exercisePR = maxBy([...new Set([].concat(...this.props.activeExerciseSet.map(exercise => exercise.sets)))],'weight')
    return (
      <Statistic.Group widths='four'>
        <Statistic>
          <Statistic.Value>{exercisePR.weight} KG</Statistic.Value>
          <Statistic.Label>Personal Record (Reps: {exercisePR.reps})</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>
            {Math.round(exercisePR.weight * (36/(37 - exercisePR.reps)) * 10)/ 10} KG
          </Statistic.Value>
          <Statistic.Label>1 Rep Max</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            -
          </Statistic.Value>
          <Statistic.Label>International Average</Statistic.Label>
        </Statistic>

        <Statistic>
          <Statistic.Value>
            {this.props.activeExerciseSet.length}
          </Statistic.Value>
          <Statistic.Label>Times done</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    )
  }
}

export default ExercisePersonalInfo;
