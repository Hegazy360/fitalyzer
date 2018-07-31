import React, {Component} from 'react'
import axios from 'axios'
import ExerciseButton from './ExerciseButton'
import Grid from '@material-ui/core/Grid';

class ExercisesButtons extends Component {

  getExerciseInfo = (id) => {
    axios.get('https://wger.de/api/v2/exercise/' + id, {}, {
      headers: {
        'Authorization': "Token ab84da10dcddca08fb0a6c0a392b9a27ee7f53df"
      }
    }).then(response => {
      this.exercise = response.data
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Grid container alignItems="flex-end" direction="row" justify="center" spacing={16} className={this.props.demo}>
          {this.props.exercisesIds.map((key, index) => {
            return (
              <ExerciseButton key = {key} exerciseId = {key} onClick = {this.props.setExerciseData.bind(this, key)} />
            );
          })}
        </Grid>
      </div>
    )
  }
}

export default ExercisesButtons
