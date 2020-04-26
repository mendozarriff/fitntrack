import React, { Component } from 'react';
import  {Button, Form, Table, Alert}  from 'react-bootstrap';
import {withRouter , Link} from "react-router-dom";

class SetWorkout extends Component {

  state = {
    exercisesPicked: sessionStorage.getItem('exercisesPicked') ? JSON.parse(sessionStorage.getItem('exercisesPicked')) : [],
    exercises: {},
    workout:[],
    errors : [],
    showError: false,
    userID:''
  }

  handleChange = (id, e) => {
    const {name, value} = e.target
    const nameID = id + "_" + name


    this.setState({
      exercises:{
        ...this.state.exercises,
        [nameID]: parseInt(value),
      },

    });
  }


  handleFocus = (e) => {
    e.target.value = ''
  }

  componentDidMount(){

    const {exercisesPicked} = this.state
    const workout = []

    for(let i=0; i<exercisesPicked.length; i++){
      workout.push({
        id: exercisesPicked[i].id,
        name: exercisesPicked[i].name,
        sets: 0,
        reps: 0,
        weight: 0
      })
    }
    this.setState({
      workout
    })
  }

  handleBlur = (id ,e) => {
  
    const {name, value} = e.target
    const nameID = id + '_' + name;

    if(value !==0){
      this.setState({
        exercises:{
          ...this.state.exercises,
          [nameID]: this.state.exercises[nameID]
        }
      })
    }else{
      e.target.value = 0
    }
  }

  handleIncrement(id, name){
    const nameID = id + '_' + name;
    if(!this.state.exercises[nameID]){
      this.setState({
        exercises:{
          ...this.state.exercises,
          [nameID]: 1
        },
      });
    }else{
      this.setState({
        exercises:{
          ...this.state.exercises,
          [nameID]: this.state.exercises[nameID]  + 1
        },
      })
    }
  }

  handleDecrement = (id, name) => {
    const nameID = id + '_' + name;

    if(!this.state.exercises[nameID]){
      this.setState({
        exercises:{
          ...this.state.exercises,
          [nameID]: 0
        },
      })
      
    }else{
      this.setState({
        exercises:{
          ...this.state.exercises,
          [nameID]: this.state.exercises[nameID]  - 1
        },
      })
    }

  }

  validateWorkout = (data) => {
    if(data.length > 0){
      this.setState({errors: data , showError: true})
    }else{
      sessionStorage.removeItem('exercisesPicked');
      this.props.history.push('/dashboard')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const exercises_picked= this.state.exercises;
    const workout_to_submit = this.state.workout
    const workout = {}

    for(let key in exercises_picked){

      for(let i=0; i<workout_to_submit.length; i++){
         if(key.split('_').shift() === workout_to_submit[i].id && key.split('_').pop() === 'sets'){
          workout_to_submit[i].sets = exercises_picked[key]
        }
        if(key.split('_').shift() === workout_to_submit[i].id && key.split('_').pop() === 'reps'){
          workout_to_submit[i].reps = exercises_picked[key]
        }
        if(key.split('_').shift() === workout_to_submit[i].id && key.split('_').pop() === 'weight'){
          workout_to_submit[i].weight = exercises_picked[key]
        }
      }
    }



    // workout.id = "78945";
    workout.userID = this.props.userID;
    workout.date = new Date()
    workout.exercises = workout_to_submit


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workout })
  };

    fetch('http://localhost:5000/workout', requestOptions)
      .then(res => res.json())
      .then( data => this.validateWorkout(data))
      .catch( err => console.log(err))

  }

 
  render(){
    // console.log('this.props.userID: ',this.props.userID)
    const {exercisesPicked} = this.state
    return (
      <div style={{marginTop: '80px'}}>
       <Form onSubmit={this.handleSubmit} method="POST" action="/set-workout">
       {exercisesPicked.length > 0 ? 
       <>
        <h4>Please fill out the form</h4>
       {this.state.showError && 
        <Alert variant='warning' onClose={() => this.setState({showError:false})} dismissible>
          <Alert.Heading>
            {this.state.errors[0].msg}
          </Alert.Heading>
        </Alert>
       }
        <Table responsive striped bordered hover variant="dark">
          
            {exercisesPicked.map((exercise,index) =>
            <React.Fragment key={exercise.id}> 
              <thead><tr><th>{exercise.name}</th></tr></thead>
              <tbody>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Sets:</p>
                  <input onChange={this.handleChange.bind(this, exercise.id)}
                          onFocus={this.handleFocus} 
                          onBlur={this.handleBlur.bind(this, exercise.id)}
                          style={{maxWidth:'50px', textAlign:'center'}} 
                          type="number"
                          name={`sets`}
                          value={this.state.exercises[`${exercise.id}_sets`] ? this.state.exercises[`${exercise.id}_sets`] : 0}
                          />
                  <div style={{width: '30%'}}>
                    <Button onClick={this.handleIncrement.bind(this, exercise.id, 'sets')} type="button">+</Button> 
                    <Button onClick={this.handleDecrement.bind(this, exercise.id, 'sets')} type="button">-</Button></div></td></tr>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Reps:</p> 
                <input onChange={this.handleChange.bind(this, exercise.id)} 
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur.bind(this, exercise.id)}
                        style={{maxWidth:'50px', textAlign:'center'}} 
                        type="number"
                        name={`reps`}
                        value={this.state.exercises[`${exercise.id}_reps`] ? this.state.exercises[`${exercise.id}_reps`]  : 0 } 
                        />
                <div style={{width: '30%'}}>
                  <Button onClick={this.handleIncrement.bind(this, exercise.id, 'reps')} type="button">+</Button> 
                  <Button onClick={this.handleDecrement.bind(this, exercise.id, 'reps')} type="button">-</Button></div></td></tr>
                <tr><td className="d-flex justify-content-around align-items-center"><p style={{width:'80px', textAlign:'right'}} >Weight:</p> 
                <input onChange={this.handleChange.bind(this, exercise.id)}
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur.bind(this, exercise.id)} 
                        style={{maxWidth:'50px', textAlign:'center'}}
                        type="number"
                        name={`weight`}
                        value={this.state.exercises[`${exercise.id}_weight`] ? this.state.exercises[`${exercise.id}_weight`] : 0}
                        />
                <div style={{width: '30%'}}>
                  <Button onClick={this.handleIncrement.bind(this, exercise.id, 'weight')} type="button">+</Button> 
                  <Button onClick={this.handleDecrement.bind(this, exercise.id, 'weight')} type="button">-</Button>
                </div></td></tr>
              </tbody>
              
            </React.Fragment>
            )}
        </Table></> : 
          <p>No workout available.  Please go <Link to='/'>back</Link> to select exercises</p>}
          <Button type='submit'>Save Workout</Button>
       </Form>
      </div>
    )
  }
}
export default withRouter(SetWorkout);