import React, {Component} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';

class ExerciseButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exercise: []
    }
  }

  getExerciseInfo = (id) => {
    axios.get('https://wger.de/api/v2/exercise/' + id).then(response => {
      this.setState({exercise: response.data})
    }).catch(error => console.log(error))
  }
  componentDidMount() {
    axios.get('https://wger.de/api/v2/exercise/' + this.props.exerciseId).then(response => {
      this.setState({exercise: response.data})
    }).catch(error => console.log(error))
  }
  render() {
    return (
      <Button onClick = {this.props.onClick}>
        <span>
          {this.state.exercise.name}
        </span>
      </Button>
    )
  }
}

export default ExerciseButton
