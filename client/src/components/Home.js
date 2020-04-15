import React, { Component } from 'react';
import  Container  from 'react-bootstrap/Container';
import ExercisesContext from '../ExercisesContext'
// const ExercisesContext = React.createContext()
class Home extends Component{
  static contextType = ExercisesContext;

  state = {
    exerciseType : 'lower body'
  }

  // componentDidMount() {
  //   const exercises = this.context

  // }
  render(){
    console.log(this.context)
    return (
      <Container>
      <ul>
        <li>All</li>
        <li>Upper Body</li>
        <li>Lower Body</li>
      </ul>
    {this.state.exerciseType === 'all' && this.context.length > 0 && this.context.map(exercise => <p key={exercise._id}>{exercise.name}</p>)}

    {this.context.map( (exercise) => exercise.type === this.state.exerciseType ? <p>{exercise.name}</p> :'' )}
        {/* {this.context.length > 0 && this.context.map(exercise => <p key={exercise._id}>{exercise.name}</p>)} */}
      </Container>
    )
  }
}

export default Home;