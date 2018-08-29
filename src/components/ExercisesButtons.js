import React, {Component} from 'react'
import ExerciseButton from './ExerciseButton'
import Grid from '@material-ui/core/Grid';
import {Button} from 'semantic-ui-react'

class ExercisesButtons extends Component {

  componentDidMount() {
    this.props.setExerciseData(Object.keys(this.props.exercisesById)[0]);
  }

  onClick = (id, index) => {
    this.props.changeActiveButton(index)
    this.props.setExerciseData(id)
  }
  render() {
    return (
      <div>
        <Grid container alignItems="flex-start" direction="column" justify="center" spacing={16} className={this.props.demo}>
          <Button.Group widths='4' vertical basic>
            {Object.keys(this.props.exercisesById).map((key, index) => {
              return (
                <ExerciseButton key = {key} exercise = {this.props.exercisesById[key][0]} index={index} activeIndex={this.props.activeExerciseButton} onClick={this.onClick.bind(this, key, index)} />

              );
            })}
          </Button.Group>
        </Grid>
      </div>
    )
  }
}

export default ExercisesButtons
