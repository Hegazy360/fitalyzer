import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import './css/ExerciseForm.css';
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux'
import * as wger from '../redux/actions/wgerActions'

const mapStateToProps = store => {
  return {
    exercise_id: store.wger.exercise_id,
    name: store.wger.name,
    setsDone: store.wger.setsDone,
    sets: store.wger.sets,
    selectedOption: store.wger.selectedOption,
    isSelectLoading: store.wger.isSelectLoading,
    options: store.wger.options,
    mounted: store.wger.mounted
  }
}

class ExerciseForm extends Component {

  componentDidMount() {
    this.props.setMounted(true)
    this.props.fetchAllExercises()
  }
  handleChange = (selectedOption) => {
    this.props.handleChange(selectedOption)
  }
  handleInput = (e) => {
    this.props.handleInput(e.target.value)
  }
  handleSets = (id, e) => {
    if(e.target.name === "weight"){
      const setValue = {"weight": e.target.value || '0', "reps": this.props.sets[id]? this.props.sets[id].reps : '0'}
      this.props.handleSets(id, setValue)
    }
    else if (e.target.name === "reps") {
      const setValue = {"weight": this.props.sets[id]? this.props.sets[id].weight : '0', "reps": e.target.value || '0'}
      this.props.handleSets(id, setValue)
    }
  }
  createExercise = () => {
    this.props.setMounted(false)
    const exercise = {
      exercise_id: this.props.exercise_id,
      name: this.props.name,
      sets: this.props.sets
    }
    this.props.addNewExercise(exercise)
  }
  renderSetsForms = () => {
    const movieItems = [];
    for (var i=0; i < this.props.setsDone; i++) {
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
        in={this.props.mounted}
        timeout={{ enter: 300 }}
      >
        <form>
          <Grid container alignItems="flex-end" direction="row" justify="center" spacing={16}>
            <Grid item xs={3}>
              <Select value={this.props.selectedOption} onChange={this.handleChange} options={this.props.options} name="name" isClearable maxMenuHeight="150" menuPlacement="bottom" isLoading={this.props.isSelectLoading}/>
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
export default connect(mapStateToProps, wger)(ExerciseForm)
