import React, { Component } from 'react';
import  {Container, ListGroup, Form, Button, Jumbotron, Modal,Table}  from 'react-bootstrap';
import {withRouter , Link} from "react-router-dom";

class SetWorkout extends Component {

  state = {
    exercisesPicked: sessionStorage.getItem('exercisesPicked') ? JSON.parse(sessionStorage.getItem('exercisesPicked')) : []
  }
  render(){

    const {exercisesPicked} = this.state
    return (
      <div style={{marginTop: '80px'}}>
       <Form>
       {exercisesPicked.length > 0 ? 
        <Table responsive striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {exercisesPicked.map(exercise =>
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                <td>sets</td>
                <td>reps</td>
                <td>weight</td>
              </tr>
            )}
          </tbody>
        </Table> : 
          <p>No workout available.  Please go <Link to='/'>back</Link> to select exercises</p>}
       </Form>
      </div>
    )
  }
}
export default SetWorkout;