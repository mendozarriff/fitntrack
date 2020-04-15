import React, { Component } from 'react';
import  Container  from 'react-bootstrap/Container';
import ExercisesContext from '../ExercisesContext'
// const ExercisesContext = React.createContext()
class Home extends Component{
  static contextType = ExercisesContext;

  state = {
    exerciseType : 'all'
  }

  switchExercise = (e) => {
    const {value} = e.target;
    this.setState({exerciseType:value})
  }

  render(){
    return (
      <div>
        <button type='button' value="all" onClick={this.switchExercise}>All</button>
        <button type='button' value="upper body" onClick={this.switchExercise}>Upper Body</button>
        <button type='button' value="lower body" onClick={this.switchExercise}>Lower Body</button>
        <Container>
          {this.state.exerciseType === 'all' && this.context.length > 0 && this.context.map(exercise => <p key={exercise._id}>{exercise.name}</p>)}

          {this.context.map( (exercise) => exercise.type === this.state.exerciseType ? <p key={exercise._id}>{exercise.name}</p> :'' )}
        </Container>
      </div>
    )
  }
}

export default Home;