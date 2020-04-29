import React, { Component } from 'react';
import  {Alert}  from 'react-bootstrap';
import {withRouter , Link} from "react-router-dom";
// import  loader  from '../loader.gif';
import Loader from 'react-loader-spinner'

class Register extends Component{

  state = {
    newUser : {
      name : '',
      email : '',
      password : '',
      password2: ''
      
    },
    errors:[],
    visible: false,
    disable: false,
    showSpinner: false
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      newUser:{
        ...this.state.newUser,
        [name]:value
      },
      
    })
  }

  registerNewUser = () => {
    this.setState({
      disable: true,
      showSpinner: true
    })

    setTimeout(
      function() {
        this.props.history.push("/login")
      }
      .bind(this),
      2000
  );
    
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);

    const {newUser} = this.state;

    const requestOptions = {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({newUser})
    }

    fetch('http://localhost:5000/register',requestOptions)
      .then(res => res.json())
      .then( data => data.errors ? this.setState({errors: data.errors, visible:true}) : this.registerNewUser() )
      .catch(err => console.log(err))
  }
  render(){
    return(
      <div style={{marginTop: '80px'}}>
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register
            </h1>
            {this.state.errors && this.state.visible && this.state.errors.map((error, i) =>
    
              <Alert key={i} variant="danger" refs="test"  onClose={ () => this.setState({visible:false})} dismissible>
                <p>
                  {error.msg}
                </p>
              </Alert> )}
           
            <form onSubmit={this.handleSubmit} action="/users/register"  method="POST">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  value = {this.state.newUser.name}
                  onChange={this.handleChange}
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value = {this.state.newUser.email}
                  onChange={this.handleChange}
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Create Password"
                  value = {this.state.newUser.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control"
                  placeholder="Confirm Password"
                  value = {this.state.newUser.password2}
                  onChange={this.handleChange}
                />
              </div>
              <button disabled={this.state.disable} type="submit" style={{position:'relative'}} className="btn btn-primary btn-block">
                Register
               
                  <Loader
                style={{position: 'absolute', top:'-3px', right:'5px'}}
                type="Rings"
                color="white"
                height={40}
                width={40}
                visible={this.state.showSpinner}
              />
               
                
              </button>
            </form>
            <p className="lead mt-4">Have An Account? <Link to="/login">Log in</Link></p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(Register);