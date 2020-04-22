import React, { Component } from 'react';
import {withRouter , Link} from "react-router-dom";

class Login extends Component{

  state = {
    user:{
      email : '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      user:{
        ...this.state.user,
        [name] : value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = this.state.user
    const sendData = {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({user})
    }

    fetch('http://localhost:5000/login', sendData)
      .then( res => res.json() )
      .then( data => console.log('response: ',data) )
    
  }
  
  render(){
    return (
      <div style={{marginTop: '80px'}}>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
              
              <form method="POST" onSubmit = {this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={this.state.user.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={this.state.user.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              <p className="lead mt-4">
                No Account? <Link to='/register'>Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;