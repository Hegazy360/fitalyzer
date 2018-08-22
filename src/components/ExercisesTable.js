import React from 'react';
import './css/ExercisesTable.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {Button, Table} from 'semantic-ui-react'


class ExercisesTable extends React.Component {
  render() {
    return (
      <Table celled structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan='2'>Exercise name</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Sets</Table.HeaderCell>
            <Table.HeaderCell colSpan='3'>Reps</Table.HeaderCell>
            <Table.HeaderCell rowSpan='2'>Delete</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>1st set</Table.HeaderCell>
            <Table.HeaderCell>2nd set</Table.HeaderCell>
            <Table.HeaderCell>3rd set</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <TransitionGroup component={Table.Body} exit={false}>
          {this.props.exercises && this.props.exercises.map(exercise => {
            return (
              <CSSTransition
                key={exercise.id}
                timeout={{ enter: 300 }}
                classNames={'fade'}
              >
                <Table.Row>
                  <Table.Cell>
                    {exercise.name}
                  </Table.Cell>
                  <Table.Cell>{exercise.sets.length}</Table.Cell>
                  <Table.Cell>
                    {exercise.sets[0] && exercise.sets[0].weight + " KG"}
                    <b>
                      {exercise.sets[0] && " (Reps: " + exercise.sets[0].reps + ")"}
                    </b>
                  </Table.Cell>
                  <Table.Cell>
                    {exercise.sets[1] && exercise.sets[1].weight + " KG"}
                    <b>
                      {exercise.sets[1] && " (Reps: " + exercise.sets[1].reps + ")"}
                    </b>
                  </Table.Cell>
                  <Table.Cell>
                    {exercise.sets[2] && exercise.sets[2].weight + " KG"}
                    <b>
                      {exercise.sets[2] && " (Reps: " + exercise.sets[2].reps  + ")"}
                    </b>
                  </Table.Cell>
                  <Table.Cell>
                    <center>
                      <Button basic primary icon="trash" onClick={() => { this.props.deleteExercise(exercise.id) }} />
                    </center>
                  </Table.Cell>
                </Table.Row>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Table>
    );
  }
}

export default ExercisesTable;
