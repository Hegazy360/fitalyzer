import React, {Component} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';

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
      exercise_id: this.props.exercise.exercise_id,
      name: this.props.exercise.name,
      weight: this.props.exercise.weight,
      sets: this.props.exercise.sets,
      reps: this.props.exercise.reps,
      selectedOption: '',
      isSelectLoading: true,
      options: []
    }
  }
  componentDidMount() {
    axios.get('https://wger.de/api/v2/exercise/?format=json&limit=350&language=2&status=2', {}, {
      headers: {
        'Authorization': "Token ab84da10dcddca08fb0a6c0a392b9a27ee7f53df"
      }
    }).then(response => {
      this.setState({options: response.data.results.map(result => ({label: result.name, value: result.id})), isSelectLoading: false });
      console.log(this.state.options);
    }).catch(error => console.log(error))
  }
  handleChange = (selectedOption) => {
    this.props.resetNotification()
    this.setState({ selectedOption, exercise_id: selectedOption.value, name: selectedOption.label});
    console.log(`Option selected:`, selectedOption);
  }
  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleBlur = () => {
    const exercise = {
      exercise_id: this.state.exercise_id,
      name: this.state.name,
      weight: this.state.weight,
      sets: this.state.sets,
      reps: this.state.reps
    }
    axios.put(`http://localhost:3001/api/v1/exercises/${this.props.exercise.id}`, {exercise: exercise}).then(response => {
      console.log(response)
      this.props.updateExercise(response.data)
    }).catch(error => console.log(error))
  }
  render() {
    return (<div className="tile">
      <form onBlur={this.handleBlur}>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
          name="name"
          isClearable
          maxMenuHeight = "150"
          menuPlacement = "bottom"
          isLoading={this.state.isSelectLoading}
        />

        <TextField
          id="weight"
          label="weight"
          className={this.props.textField}
          value={this.state.weight || ""}
          onChange={this.handleInput}
          margin="normal"
          label='Weight lifted'
          name="weight"
        />
        <TextField
          id="sets"
          label="sets"
          className={this.props.textField}
          value={this.state.sets || ""}
          onChange={this.handleInput}
          margin="normal"
          label='Sets done'
          name="sets"
        />
        <TextField
          id="reps"
          label="reps"
          className={this.props.textField}
          value={this.state.reps || ""}
          onChange={this.handleInput}
          margin="normal"
          label='Reps done'
          name="reps"
        />
      </form>
    </div>);
  }
}
export default ExerciseForm
