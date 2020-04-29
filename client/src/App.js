import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-calendar/dist/Calendar.css';
import { Container, Form} from 'react-bootstrap';
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
    filtered: [],
    exercisesPicked : [],
    userPerson : {},
    user: {
      email: '',
      name: '',
      _id: '',
      authorized: false
    },
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
    filtered : exercises,
    exercises
  })
}


handleChange = (e) => {

      // Variable to hold the original version of the list
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];
  
      // If the search bar isn't empty
      if (e.target.value !== "") {
        // Assign the original list to currentList
        currentList = this.state.exercises;
  
        // Use .filter() to determine which items should be displayed
        // based on the search terms
        newList = currentList.filter(item => {
           // change current item to lowercase
          const lc = item.name.toLowerCase();
            // change search term to lowercase
          const filter = e.target.value.toLowerCase();
            // check to see if the current list item includes the search term
            // If it does, it will be added to newList. Using lowercase eliminates
            // issues with capitalization in search terms and search content
            // let myObject=<span style="color: red;">{filter}</span>;

            // console.log('filter: ', myObject.props.children)
          return lc.includes(filter);


        });
      } else {
              // If the search bar is empty, set newList to original task list
        newList = this.state.exercises;
      }
          // Set the filtered state based on what our rules added to newList
      this.setState({
        filtered: newList
      });

 }

request = async () => {
  const response = await fetch('http://localhost:5000',{credentials:'include'})
  const json = await response.json();
  this.displayExercises(json.exercises)
  this.authorizedUser(json.user)
}


  componentDidMount(){
    this.request();
  }


  render(){
    const filtered = this.state.filtered;
    return (
      
      <div className="App">
      <Router>
        <TopNavbar user={this.state.user}  />
       
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
            <Home filtered={filtered} data={this.state.exercises} handleSearchBarChange={this.handleChange} />
          </Route>
          
        </Switch>
      </Router>
      </div>
      
    );
  }
}

export default App;
