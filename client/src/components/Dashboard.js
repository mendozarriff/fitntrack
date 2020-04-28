import React, { Component } from 'react';
import { Button, Container, Table } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import Calendar from 'react-calendar';

class Dashboard extends Component {

  state={
    user:{
      name:'',
      id:'',
      email:'',
      authorized: false
    },
    workouts : [],
    filter: 'today',
    date: new Date(),
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

  handleCalendarChange = (date) => {
    this.setState({ date, filter:'by_date' })

    // console.log(moment(date).format('MM/DD/YYYY'))

  } 
  viewWorkouts = (filter) => {
    let today = new Date();
    today = moment(today).format('MM-DD-YYYY')
    let filteredworkout = []

    // sorted workouts by date
    const sortedWorkouts = _.sortBy(this.state.workouts, function(o){
      return new moment(o.date);
    }).reverse();

    

    if(filter === "all"){
     return sortedWorkouts.length > 0 ? sortedWorkouts.map(workout => 
         <>
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
          <Button>Copy Workout</Button>
        </>
    ) : <p>You have no workouts</p>
    }

    if(filter === "today"){
     filteredworkout = sortedWorkouts.filter(workout => 
          moment(workout.date).format('MM-DD-YYYY') === today);
          return filteredworkout.length > 0 ? filteredworkout.map(workout => 
            <>
            <Calendar 
            onChange = {this.handleCalendarChange}
            value = {this.state.date}
            tileClassName = "testingTile"
            tileContent = { ({ date, view }) => {
               return this.state.workouts.map( workout => view === 'month' && moment(date).format('MM/DD/YYYY') === moment(workout.date).format('MM/DD/YYYY') ? <p>&#x1F3CB;</p> : null   )
            }}
          />
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
            </>
        ): <p> You have no workout for today </p>
    }

    if(filter === "by_date"){
      filteredworkout = sortedWorkouts.filter(workout => 
        moment(workout.date).format('MM/DD/YYYY') === moment(this.state.date).format('MM/DD/YYYY'));
        return filteredworkout.length > 0 ? filteredworkout.map(workout => 
          <>
          <Calendar 
          onChange = {this.handleCalendarChange}
          value = {this.state.date}
          tileClassName = "testingTile"
          tileContent = { ({ date, view }) => {
             return this.state.workouts.map( workout => view === 'month' && moment(date).format('MM/DD/YYYY') === moment(workout.date).format('MM/DD/YYYY') ? <p>&#x1F3CB;</p> : null   )
          }}
        />
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
          </>
      ): <><Calendar 
      onChange = {this.handleCalendarChange}
      value = {this.state.date}
      tileClassName = "testingTile"
      tileContent = { ({ date, view }) => {
         return this.state.workouts.map( workout => view === 'month' && moment(date).format('MM/DD/YYYY') === moment(workout.date).format('MM/DD/YYYY') ? <p>&#x1F3CB;</p> : null   )
      }}
    /><p>There is no workout for this day</p> </>
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
          <Button active={this.state.filter === 'today'} onClick={ () => this.setState({filter:'today', date: new Date()}) }>Todays Workout</Button>
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