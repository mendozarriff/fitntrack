import React, { Component } from 'react';
import { Button, Container, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {

  state={
    user:{
      name:'',
      id:'',
      email:'',
      authorized: false
    },
    workouts : [],
    filter: 'today'
  }
  // fetches the data coming from index route, data was posted from router /login
  componentDidMount(){
    // credentials: 'include' -  this object was passed to allow session and cookies be available for the backend to manipulate
      fetch('http://localhost:5000/dashboard',{credentials: 'include'})
      .then(res => res.json())
      .then( data => {
        // updates the state of this component which is the user info
        this.setState({ 
        user:{
          name: data.user.name,
          id: data.user._id,
          email: data.user.email,
          authorized: data.authorized
        },
        workouts: data.workouts
      });
      //updates the state coming from a function from App.js
      //this is done to have this data available on parent component App
       this.props.updateUser(data.user)  
    }).catch(err => console.log('error: ', err))

  }

  handleLogout = () => {
    // fetches data from route logout - calls a function res.logout() to log out the user from the backend
    axios.get('http://localhost:5000/logout',{ withCredentials: true })
      .then( (res)=>{
        if(res.status === 200){
          // updates the state coming from App.js - to an empty object - to remove all data from the fron end
          this.props.updateUser({
            name:'',
            _id:'',
            email:'',
            authorized: res.data.authorized
          })
          
          // take the user to the Login component 
          this.props.history.push("/login")
        }
      }).catch( err =>  console.log('err: ', err))
  }
  viewWorkouts = (filter) => {
    let today = new Date();
    today = moment(today).format('MM-DD-YYYY')
    let filteredworkout = []
    if(filter === "all"){
     return this.state.workouts.length > 0 ? this.state.workouts.map(workout => 
         
        <Table key={workout._id} striped bordered hover size="sm">
        {/* {console.log('today: ',moment(today).format('MM-DD-YYYY') === moment(workout.date).format('MM-DD-YYYY') )} */}
          <thead>
            <tr style={{background:'yellow', color:'black'}}>
              <th colSpan="12">{moment(workout.date).format('LL')}</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            
        {workout.exercises.map( exercise => 
            <tr key={exercise._id}>
              <td>{exercise.name}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.weight}</td>
            </tr>
        )}
          </tbody>
        </Table>
    ) : <p>You have no workouts</p>
    }

    if(filter === "today"){
     filteredworkout = this.state.workouts.filter(workout => 
          moment(workout.date).format('MM-DD-YYYY') === today);
          return filteredworkout.length > 0 ? filteredworkout.map(workout => 
         
            <Table key={workout._id} striped bordered hover size="sm">
              <thead>
                <tr style={{background:'yellow', color:'black'}}>
                  <th colSpan="12">{moment(workout.date).format('LL')}</th>
                </tr>
                <tr>
                  <th>Name</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                
            {workout.exercises.map( exercise => 
                <tr key={exercise._id}>
                  <td>{exercise.name}</td>
                  <td>{exercise.sets}</td>
                  <td>{exercise.reps}</td>
                  <td>{exercise.weight}</td>
                </tr>
            )}
              </tbody>
            </Table>
        ): <p> You have no workout for today </p>
    }
  }



  render(){
    return(
      <div style={{marginTop: '100px'}}>
      <Container>
      <h1>Dashboard</h1>
      {this.state.user.authorized ? 
      <div>
      
        <h3>{this.state.user.name}</h3>
        <div>
        <h2>Workouts</h2>
        <div>
          <Button active={this.state.filter === 'today'} onClick={ () => this.setState({filter:'today'}) }>Todays Workout</Button>
          <Button active={this.state.filter === 'all'} onClick={ () => this.setState({filter:'all'}) }>View All Workouts</Button>
        </div>

        {this.viewWorkouts(this.state.filter)}
        
        </div>

        <Button onClick={this.handleLogout}>Logout</Button>
      </div> : 
      <div>Protected Page</div>
      }
      </Container>
      </div>
    
    )
  }
}

export default withRouter(Dashboard);