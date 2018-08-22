import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'semantic-ui-react'

class ExerciseButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exercise: []
    }
  }

  componentDidMount() {
    axios.get('https://wger.de/api/v2/exercise/' + this.props.exerciseId).then(response => {
      this.setState({exercise: response.data})
    }).catch(error => console.log(error))
  }

  render() {
    return (
      <Button onClick = {this.props.onClick} className={this.props.index === this.props.activeIndex? 'active' : ''} >
        {this.state.exercise.name}
      </Button>
    )
  }
}

export default ExerciseButton
