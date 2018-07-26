import React from 'react'

const Exercise = ({exercise}) =>
  <div className="tile" key={exercise.id} >
    <h4>{exercise.name}</h4>
    <p>{exercise.weight}</p>
    <hr />
  </div>


export default Exercise
