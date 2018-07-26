import React, {Component} from 'react'

class Exercise extends Component {

  handleClick = () => {
    this.props.onClick(this.props.exercise.id)
  }
  handleDelete = () => {
    this.props.onDelete(this.props.exercise.id)
  }
  render() {
    return (<div className="tile">
      <span className="deleteButton" onClick={this.handleDelete}>
        x
      </span>
      <h4 onClick={this.handleClick}>
        {this.props.exercise.name}
      </h4>
      <p onClick={this.handleClick}>
        {this.props.exercise.weight}
      </p>
    </div>)
  }
}

export default Exercise
