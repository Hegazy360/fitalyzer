import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const styles = {
  root: {
    width: '100%',
    margin: 'auto',
    marginTop: 25,
    marginBottom: 25,
    overflowX: 'auto',
  },
  table: {
    minWidth: 545
  },
};

class ExercisesTable extends React.Component {
  render() {
    return (
      <Paper style={{...styles.root}}>
        <Toolbar>
          <div>
           <Typography variant="title" id="tableTitle">
             {this.props.date}
           </Typography>
          </div>
        </Toolbar>
        <Table style={{...styles.table}}>
          <TableHead>
            <TableRow>
              <TableCell>Exercise name</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.exercises.map(exercise => {
              return (
                <TableRow key={exercise.id}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.sets.length}</TableCell>
                  <TableCell>
                    {
                      exercise.sets.map(set => {
                          return (
                            <span key= {set.id}>
                              {set.weight},
                            </span>
                          )
                        }
                      )
                    }
                  </TableCell>
                  <TableCell>
                    {
                      exercise.sets.map(set => {
                          return (
                            <span key= {set.id}>
                              {set.reps},
                            </span>
                          )
                        }
                      )
                    }
                  </TableCell>
                  <TableCell>
                    <Button>
                      <DeleteForeverOutlinedIcon className={this.props.icon} color="action" onClick={() => { this.props.deleteExercise(exercise.id) }} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default ExercisesTable;
