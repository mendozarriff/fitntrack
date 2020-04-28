import React, { Component } from 'react';
import  {Container, ListGroup, Form, Button, Jumbotron}  from 'react-bootstrap';
import ReactSearchBox from 'react-search-box';
import ExerciseDescriptionModal from './ExerciseDescriptionModal';
import _ from 'lodash';
import {withRouter } from "react-router-dom";


class Home extends Component{

  state = {
    exerciseType : 'all',
    exercisesPicked: [],
    checked: {},
    modalShow : false,
    setModalShow : false,
    modalTitle : '',
    modalDescription: '',
    modalGif: '',
    aboutProps: {},
    filtered : []
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

  componentDidMount(){
    console.log('this.props.exercises: ',this.props.exercises)
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    const {exercisesPicked} = this.state;
    sessionStorage.setItem('exercisesPicked', JSON.stringify(exercisesPicked));
    this.props.history.push("/set-workout");
  }

  displayExercises = (allExercises) => {
   
    return (
      <Container className="exercises">
      {/* <h1>{this.props.user}</h1> */}
      
        <Form onSubmit={this.handleSubmit}>
        <ListGroup>
            {this.state.exerciseType === 'all' && allExercises.length > 0 && allExercises.map(exercise => <ListGroup.Item key={exercise._id}>
              <div className="d-flex justify-content-between align-items-center"> 
                <p style={{textTransform:'capitalize', width: '30%'}}>{exercise.name}</p>
                <p  style={{width: '30%', textAlign:"center"}}
                    onClick={ () => this.setState({modalShow:true,modalTitle:exercise.name,modalDescription:exercise.description, modalGif: exercise.gif})}>Learn More</p>

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

            {allExercises.map( (exercise) => exercise.type === this.state.exerciseType ? 
            <ListGroup.Item key={exercise._id}>
              <div className="d-flex justify-content-between align-items-center"> 
                <p style={{textTransform:'capitalize', width: '30%'}}>{exercise.name}</p>
                <p style={{width: '30%', textAlign:"center"}}
                onClick={ () => this.setState({modalShow:true,modalTitle:exercise.name,modalDescription:exercise.description, modalGif: exercise.gif})}>Learn More</p>
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
    const allExercises = _.orderBy(this.props.exercises,['name'], ['asc']);
    return (
      <div>
      {/* <h1>{this.props.user && this.props.user.name}</h1> */}
        <Jumbotron className="exercise_types" style={{textAlign:'center'}}>
          <Button variant="primary" size="lg" type='button' value="all" onClick={this.switchExercise}>All</Button>{'  '}
          <Button variant="primary" size="lg" type='button' value="upper body" onClick={this.switchExercise}>Upper Body</Button>{'  '}
          <Button variant="primary" size="lg" type='button' value="lower body" onClick={this.switchExercise}>Lower Body</Button>
          {/* <input onChange={this.handleSearchBarChange.bind(this, allExercises)} type="search" id="site-search" name="q"
        aria-label="Search through site content"></input> */}
        </Jumbotron>
        
        {this.displayExercises(allExercises)}
        <ExerciseDescriptionModal
          show={this.state.modalShow}
          onHide={() => this.setState({modalShow:false, modalTitle:'',modalDescription:'',modalGif:'' })}
          modalTitle={this.state.modalTitle}
          modalDescription={this.state.modalDescription}
          modalGif = {this.state.modalGif}
        /> 
      </div>
    )
  }
}

export default withRouter(Home);