import React, {Component} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import update from 'immutability-helper'
import './css/ExerciseForm.css';
import { CSSTransition } from "react-transition-group";

class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise_id: null,
      name: '',
      setsDone: 0,
      sets: [],
      selectedOption: '',
      isSelectLoading: true,
      options: [],
      mounted: false
    }
  }
  componentDidMount() {
    this.setState({
      mounted: true
    })
    axios.get('https://wger.de/api/v2/exercise/?format=json&limit=350&language=2&status=2', {}, {
      headers: {
        'Authorization': "Token ab84da10dcddca08fb0a6c0a392b9a27ee7f53df"
      }
    }).then(response => {
      this.setState({
        options: response.data.results.map(result => ({label: result.name, value: result.id})),
        isSelectLoading: false,
      });
    }).catch(error => console.log(error))
  }
  handleChange = (selectedOption) => {
    this.props.resetNotification()
    this.setState({selectedOption, exercise_id: selectedOption? selectedOption.value : '', name: selectedOption? selectedOption.label : ''});
  }
  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSets = (id, e) => {
    this.props.resetNotification()
    console.log(e.target.name);
    if(e.target.name === "weight"){
      const setValue = {"weight": e.target.value || '0', "reps": this.state.sets[id]? this.state.sets[id].reps : '0'}
      const sets = update(this.state.sets, {
        [id]: {
          $set: setValue
        }
      })
      this.setState({sets: sets}, () => console.log(this.state.sets))
    }
    else if (e.target.name === "reps") {
      const setValue = {"weight": this.state.sets[id]? this.state.sets[id].weight : '0', "reps": e.target.value || '0'}

      const sets = update(this.state.sets, {
        [id]: {
          $set: setValue
        }
      })
      this.setState({sets: sets}, () => console.log(this.state.sets))
    }
  }
  createExercise = () => {
    this.setState({mounted: false})
    const exercise = {
      exercise_id: this.state.exercise_id,
      name: this.state.name,
      sets: this.state.sets
    }
    this.props.addNewExercise(exercise)
  }
  renderSetsForms = () => {
    const movieItems = [];
    for (var i=0; i < this.state.setsDone; i++) {
        movieItems.push(
          <Grid key = {i} container alignItems="center" direction="row" justify="center" spacing={16}>
            <TextField id="weight" className={this.props.textField} onChange={this.handleSets.bind(this, i)} margin="normal" label='Set weight' name="weight"/>
            <TextField id="reps" className={this.props.textField} onChange={this.handleSets.bind(this, i)} margin="normal" label='Set reps' name="reps"/>
          </Grid>
        );
    }
    return movieItems;
  }

  render() {
    return (<div className="tile">
      <CSSTransition
        classNames="slide-down"
        in={this.state.mounted}
        timeout={{ enter: 300, exit: 300 }}
      >
        <form>
          <Grid container alignItems="flex-end" direction="row" justify="center" spacing={16}>
            <Grid item xs={3}>
              <Select value={this.state.selectedOption} onChange={this.handleChange} options={this.state.options} name="name" isClearable maxMenuHeight="150" menuPlacement="bottom" isLoading={this.state.isSelectLoading}/>
            </Grid>
            <Grid item>
              <TextField id="sets_number" className={this.props.textField} onChange={this.handleInput} margin="normal" label='Sets done' name="setsDone"/>
            </Grid>
            <Grid item>
              <Tooltip title="Save Exercise" placement="right">
                <Button variant="fab" color="primary" aria-label="Save" className={this.props.button} onClick={this.createExercise}>
                  <AddIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container alignItems="flex-end" direction="row" justify="center" spacing={16}>
            {
              this.renderSetsForms()
            }
          </Grid>
        </form>
      </CSSTransition>

    </div>);
  }
}
export default ExerciseForm
