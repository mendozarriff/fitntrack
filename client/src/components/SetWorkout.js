import React, { Component } from 'react';
import  {Container, ListGroup, Form, Button, Jumbotron, Modal,Table}  from 'react-bootstrap';
import {withRouter , Link} from "react-router-dom";

class SetWorkout extends Component {

  state = {
    exercisesPicked: sessionStorage.getItem('exercisesPicked') ? JSON.parse(sessionStorage.getItem('exercisesPicked')) : [],
    exercises: {
    },
    sets : 0,
    reps: 0,
    weight: 0,
    workout:[]
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({
      exercises:{
        ...this.state.exercises,
        [name]: parseInt(value)
      }
    })
  }

  handleFocus = (e) => {
    e.target.value = '';
  }

  handleBlur = (e) => {
  
    const {name} = e.target
    if(this.state.exercises[name]){
      return
    }else{
      e.target.value = 0
    }
  }

  handleIncrement(name){
    if(!this.state.exercises[name]){
      this.setState({
        exercises:{
          ...this.state.exercises,
          [name]: 1
        },
      })
    }else{
      this.setState({
        exercises:{
          ...this.state.exercises,
          [name]: this.state.exercises[name]  + 1
        },
      })
    }
  }

  handleDecrement = (name) => {
    if(!this.state.exercises[name]){
      this.setState({
        exercises:{
          ...this.state.exercises,
          [name]: 0
        },
      })
    }else{
      this.setState({
        exercises:{
          ...this.state.exercises,
          [name]: this.state.exercises[name]  - 1
        },
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  }
  render(){
    console.log(this.state.exercises)
    const {exercisesPicked} = this.state
    return (
      <div style={{marginTop: '80px'}}>
       <Form onSubmit={this.handleSubmit}>
       {exercisesPicked.length > 0 ? 
       <>
        <h4>Please fill out the form</h4>
        <Table responsive striped bordered hover variant="dark">
          
            {exercisesPicked.map(exercise =>
            <React.Fragment key={exercise.id}> 
              <thead><tr><th>{exercise.name}</th></tr></thead>
              <tbody>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Sets:</p>
                  <input onChange={this.handleChange}
                          onFocus={this.handleFocus} 
                          onBlur={this.handleBlur}
                          style={{maxWidth:'50px', textAlign:'center'}} 
                          type="number"
                          name={`${exercise.id}_sets`}
                          value={this.state.exercises[`${exercise.id}_sets`] ? this.state.exercises[`${exercise.id}_sets`] : 0}
                          />
                  <div style={{width: '30%'}}>
                    <Button onClick={this.handleIncrement.bind(this,`${exercise.id}_sets`)} type="button">+</Button> 
                    <Button onClick={this.handleDecrement.bind(this,`${exercise.id}_sets`)} type="button">-</Button></div></td></tr>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Reps:</p> 
                <input onChange={this.handleChange} 
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur}
                        style={{maxWidth:'50px', textAlign:'center'}} 
                        type="number"
                        name={`${exercise.id}_reps`}
                        value={this.state.exercises[`${exercise.id}_reps`] ? this.state.exercises[`${exercise.id}_reps`]  : 0 } 
                        />
                <div style={{width: '30%'}}>
                  <Button onClick={this.handleIncrement.bind(this,`${exercise.id}_reps`)} type="button">+</Button> 
                  <Button onClick={this.handleDecrement.bind(this,`${exercise.id}_reps`)} type="button">-</Button></div></td></tr>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Weight:</p> 
                <input onChange={this.handleChange}
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur} 
                        style={{maxWidth:'50px', textAlign:'center'}}
                        type="number"
                        name={`${exercise.id}_weight`}
                        value={this.state.exercises[`${exercise.id}_weight`] ? this.state.exercises[`${exercise.id}_weight`] : 0}
                        />
                <div style={{width: '30%'}}>
                  <Button onClick={this.handleIncrement.bind(this,`${exercise.id}_weight`)} type="button">+</Button> 
                  <Button onClick={this.handleDecrement.bind(this,`${exercise.id}_weight`)} type="button">-</Button>
                </div></td></tr>
              </tbody>

            </React.Fragment>
            )}
        </Table></> : 
          <p>No workout available.  Please go <Link to='/'>back</Link> to select exercises</p>}
          <Button type='submit'>Submit</Button>
       </Form>
      </div>
    )
  }
}
export default withRouter(SetWorkout);