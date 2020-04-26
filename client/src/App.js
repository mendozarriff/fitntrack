import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TopNavbar from './components/TopNavbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { ExercisesProvider } from './ExercisesContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SetWorkout from './components/SetWorkout';
import Dashboard from './components/Dashboard';
import axios from 'axios';

class App extends Component {

  state = {
    exercises : [],
    exercisesPicked : [],
    userPerson : {},
    user: {
      email: '',
      name: '',
      _id: '',
      authorized: false
    }
  }

  authorizedUser = (user) => {

    if(user){
      const { email , name, _id } = user
      this.setState({
        user:{
          email,
          name,
          _id,
          authorized : user.authorized !== undefined ? user.authorized : true
        }
      })
    }
}

displayExercises = (exercises) => {
  this.setState({
    exercises
  })
}



  componentDidMount(){
    fetch('http://localhost:5000',{credentials:'include'})
    .then(res => res.json())
    .then(res => {
      this.displayExercises(res.exercises)
      this.authorizedUser(res.user)
    })
  }

  render(){
    // console.log('this.state.user._id: ',this.state.user._id)
    const exercises = this.state.exercises;
    return (
      
      <div className="App">
      <Router>
        <TopNavbar user={this.state.user}  />
        <TopNavbar />
        
        <Switch>
          <Route path="/set-workout">
              <SetWorkout userID={this.state.user._id} />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard updateUser={this.authorizedUser} />
          </Route>

         <Route path="/login">
              <Login />
          </Route>
       
          <Route path="/">
            <ExercisesProvider value={exercises}>
            <Home/>
            </ExercisesProvider>
          </Route>
          
        </Switch>
      </Router>
      </div>
      
    );
  }
}

export default App;
