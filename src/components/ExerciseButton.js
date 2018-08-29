import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'semantic-ui-react'

class ExerciseButton extends Component {

  render() {
    return (
      <Button onClick = {this.props.onClick} className={this.props.index === this.props.activeIndex? 'active' : ''} >
        {this.props.exercise.name}
      </Button>
    )
  }
}

export default ExerciseButton
