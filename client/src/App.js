import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import TopNavbar from './components/TopNavbar';
import Home from './components/Home';
import { ExercisesProvider } from './ExercisesContext';

// const ExercisesContext = React.createContext()

class App extends Component {

  state = {
    exercises : []
  }

  // getExercises(){
  //   fetch('http://localhost:5000')
  //   .then(res => res.json())
  //   .then(res => this.setState({exercises: res}))
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
      <TopNavbar />
      <ExercisesProvider value={exercises}>
      <Home />
      </ExercisesProvider>
      {/* <Home exercises={this.state.exercises} /> */}
        {/* {this.state.exercises.length > 0 && this.state.exercises.map(exercise => <p key={exercise._id}>{exercise.name}</p>)} */}
      </div>
      
    );
  }
}

export default App;
