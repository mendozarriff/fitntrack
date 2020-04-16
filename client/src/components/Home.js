import React, { Component } from 'react';
import  {Container, ListGroup, Form, Button, Jumbotron}  from 'react-bootstrap';
import ExercisesContext from '../ExercisesContext'
import _ from 'lodash';
// const ExercisesContext = React.createContext()
class Home extends Component{
  static contextType = ExercisesContext;

  state = {
    exerciseType : 'all',
    exercisesPicked: [],
    checked: {}
  }

  switchExercise = (e) => {
    const {value} = e.target;
    this.setState({exerciseType:value})
  }

  handleChange = (id,e) => {
   const {name, value} = e.target;

    if(e.target.checked){
      this.setState({
        exercisesPicked:[
          ...this.state.exercisesPicked,
          {
            id,
            name: value,
          }
        ],
        checked:{
          ...this.state.checked,
          [name]:value
        }
        
      })
    }else{
      this.setState({
        checked:_.omit(this.state.checked, [e.target.name]),
        exercisesPicked: this.state.exercisesPicked.filter(exercise => exercise.id !== id)
      })
    }
    

  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const seen = new Set();
    const filteredArr = this.state.exercisesPicked.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    console.log('filteredArr',filteredArr)
    // this.state.exercisesPicked.filter()
  }

  displayExercises = () => {
    return (
      <Container className="exercises">
        <Form onSubmit={this.handleSubmit}>
        <ListGroup>
            {this.state.exerciseType === 'all' && this.context.length > 0 && this.context.map(exercise => <ListGroup.Item key={exercise._id}>
              <div className="d-flex justify-content-between align-items-center"> 
                <p style={{textTransform:'capitalize', width: '30%'}}>{exercise.name}</p>
                <p style={{width: '30%', textAlign:"center"}}>Learn More</p>
                <Form.Group style={{width: '30%', textAlign:"right"}} controlId="formBasicCheckbox">
                  <input 
                    type="checkbox" 
                    onChange={this.handleChange.bind(this, exercise._id)}
                    name={`${exercise._id}_${exercise.type}`} 
                    value={exercise.name}
                    checked={this.state.checked[`${exercise._id}_${exercise.type}`] === exercise.name} 
                    />
                    
                </Form.Group> 
              </div>
            </ListGroup.Item>)}

            {this.context.map( (exercise) => exercise.type === this.state.exerciseType ? 
            <ListGroup.Item key={exercise._id}>
              <div className="d-flex justify-content-between align-items-center"> 
                <p style={{textTransform:'capitalize', width: '30%'}}>{exercise.name}</p>
                <p style={{width: '30%', textAlign:"center"}}>Learn More</p>
                <Form.Group style={{width: '30%', textAlign:"right"}} controlId="formBasicCheckbox">
                  <input 
                    type="checkbox"
                    onChange={this.handleChange.bind(this, exercise._id)} 
                    name={`${exercise._id}_${exercise.type}`} 
                    value={exercise.name}
                    checked={this.state.checked[`${exercise._id}_${exercise.type}`] === exercise.name} 
                    />
                </Form.Group> 
              </div>
            </ListGroup.Item> :'' )}
        </ListGroup>
        <Button type="submit">Submit</Button>
        </Form>
      </Container>
    )
  }


  render(){
    console.log('exercisesPicked: ',this.state.exercisesPicked)
    return (
      <div>
        <Jumbotron className="exercise_types" style={{textAlign:'center'}}>
          <Button variant="primary" size="lg" type='button' value="all" onClick={this.switchExercise}>All</Button>{'  '}
          <Button variant="primary" size="lg" type='button' value="upper body" onClick={this.switchExercise}>Upper Body</Button>{'  '}
          <Button variant="primary" size="lg" type='button' value="lower body" onClick={this.switchExercise}>Lower Body</Button>
        </Jumbotron>
        {this.displayExercises()}
      </div>
    )
  }
}

export default Home;