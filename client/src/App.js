import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import TopNavbar from './components/TopNavbar';
import Home from './components/Home';
import { ExercisesProvider } from './ExercisesContext';
import { ExercisesPickedProvider } from './ExercisesPickedContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SetWorkout from './components/SetWorkout';

// const ExercisesContext = React.createContext()

class App extends Component {

  state = {
    exercises : [],
    exercisesPicked : []
  }

  // setExercisesPicked = () => {

  // }

  componentDidMount(){
    fetch('http://localhost:5000')
    .then(res => res.json())
    .then(res => this.setState({exercises: res}))
    // this.getExercises()
  }
  render(){
    const exercises = this.state.exercises;
    return (
      
      <div className="App">
      <Router>
        <TopNavbar />
        <Switch>
          <Route path="/set-workout">
            {/* <ExercisesPickedProvider value={exercisesPicked}> */}
              <SetWorkout />
            {/* </ExercisesPickedProvider> */}
          </Route>
          <Route path="/">
            <ExercisesProvider value={exercises}>
            <Home />
            </ExercisesProvider>
          </Route>
          
        </Switch>
      </Router>
      </div>
      
    );
  }
}

export default App;
