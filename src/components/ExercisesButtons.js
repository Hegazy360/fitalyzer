import React, {Component} from 'react'
import ExerciseButton from './ExerciseButton'
import Grid from '@material-ui/core/Grid';
import {Button} from 'semantic-ui-react'

class ExercisesButtons extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  componentDidMount() {
    this.props.setExerciseData(this.props.exercisesIds[0]);
  }
  
  onClick = (id, index) => {
    this.setState({active: index})
    this.props.setExerciseData(id)
  }
  render() {
    return (
      <div>
        <Grid container alignItems="flex-start" direction="column" justify="center" spacing={16} className={this.props.demo}>
          <Button.Group widths='4' vertical basic>
            {this.props.exercisesIds.map((key, index) => {
              return (
                <ExerciseButton key = {key} exerciseId = {key} index={index} activeIndex={this.state.active} onClick={this.onClick.bind(this, key, index)} />
              );
            })}
          </Button.Group>
        </Grid>
      </div>
    )
  }
}

export default ExercisesButtons
