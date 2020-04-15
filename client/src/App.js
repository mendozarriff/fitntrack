import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    exercises : []
  }

  getExercises(){
    fetch('http://localhost:5000')
    .then(res => res.json())
    .then(res => this.setState({exercises: res}))
  }

  componentDidMount(){
    this.getExercises()
  }
  render(){
    return (
      <div className="App">
        {this.state.exercises.length > 0 && this.state.exercises.map(exercise => <p key={exercise._id}>{exercise.name}</p>)}
      </div>
    );
  }
}

export default App;
