import React, {Component} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.exercise.name,
      weight: this.props.exercise.weight
    }
  }
  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleBlur = () => {
    const exercise = {
      name: this.state.name,
      weight: this.state.weight
    }
    axios.put(`http://localhost:3001/api/v1/exercises/${this.props.exercise.id}`, {exercise: exercise}).then(response => {
      console.log(response)
      this.props.updateExercise(response.data)
    }).catch(error => console.log(error))
  }
  render() {
    return (<div className="tile">
      <form onBlur={this.handleBlur}>
        <TextField
          id="name"
          label="Name"
          className={this.props.textField}
          value={this.state.name}
          onChange={this.handleInput}
          margin="normal"
          label='Exercise Name'
          name="name"
          ref={this.props.titleRef}
        />
        <TextField
          id="weight"
          label="weight"
          className={this.props.textField}
          value={this.state.weight}
          onChange={this.handleInput}
          margin="normal"
          label='Weight lifted'
          name="weight"
        />
      </form>
    </div>);
  }
}
export default ExerciseForm
