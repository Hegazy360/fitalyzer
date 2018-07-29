import React, {Component} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    height: 240
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise_id: null,
      name: '',
      weight: null,
      sets: null,
      reps: null,
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
      this.setState({
        options: response.data.results.map(result => ({label: result.name, value: result.id})),
        isSelectLoading: false
      });
      console.log(this.state.options);
    }).catch(error => console.log(error))
  }
  handleChange = (selectedOption) => {
    this.props.resetNotification()
    this.setState({selectedOption, exercise_id: selectedOption? selectedOption.value : '', name: selectedOption? selectedOption.label : ''});
    console.log(`Option selected:`, selectedOption);
  }
  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  createExercise = () => {
    const exercise = {
      exercise_id: this.state.exercise_id,
      name: this.state.name,
      weight: this.state.weight,
      sets: this.state.sets,
      reps: this.state.reps
    }
    this.props.addNewExercise(exercise)
  }
  render() {
    return (<div className="tile">
      <form>
        <Grid container alignItems="flex-end" direction="row" justify="center" spacing={16} className={this.props.demo}>
          <Grid item xs={3}>
            <Select value={this.state.selectedOption} onChange={this.handleChange} options={this.state.options} name="name" isClearable maxMenuHeight="150" menuPlacement="bottom" isLoading={this.state.isSelectLoading}/>
          </Grid>
          <Grid item>
            <TextField id="weight" className={this.props.textField} onChange={this.handleInput} margin="normal" label='Weight lifted' name="weight" required/>
          </Grid>
          <Grid item>
            <TextField id="sets" className={this.props.textField} onChange={this.handleInput} margin="normal" label='Sets done' name="sets" required/>
          </Grid>
          <Grid item>
            <TextField id="reps" className={this.props.textField} onChange={this.handleInput} margin="normal" label='Reps done' name="reps" required/>
          </Grid>
          <Grid item>
            <Button variant="extendedFab" color="primary" aria-label="Add" className="newExerciseButton" onClick={this.createExercise}>
              <AddIcon/>
              Add Exercise
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>);
  }
}
export default ExerciseForm
