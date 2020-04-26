import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {

  state={
    user:{
      name:'',
      id:'',
      email:'',
      authorized: false
    }
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
      }});
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

  render(){
    return(
      <div style={{marginTop: '100px'}}>
      <h1>Dashboard</h1>
      {this.state.user.authorized ? 
      <div>
      
        <h3>{this.state.user.name}</h3>
        <h4>{this.state.user.id}</h4>
        <Button onClick={this.handleLogout}>Logout</Button>
      </div> : 
      <div>Protected Page</div>
      }
 
      </div>
    
    )
  }
}

export default withRouter(Dashboard);