import React, {Component} from 'react'
import Search from './Search'
import axios from 'axios'

class ExerciseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.exercise.name,
      weight: this.props.exercise.weight
    }
  }
  handleInput = (e) => {
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
    }).catch(error => console.log(error))
  }
  render() {
    return (<div className="tile">
      <form onBlur={this.handleBlur}>
        <Search className='input' name="name" placeholder='Search exercise' value={this.state.title} onChange={this.handleInput} />
        <textarea className='input' name="weight" placeholder='Weight lifted' value={this.state.body} onChange={this.handleInput}></textarea>
      </form>
    </div>);
  }
}
export default ExerciseForm
