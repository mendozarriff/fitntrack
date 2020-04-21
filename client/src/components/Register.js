import React, { Component } from 'react';

class Register extends Component{

  state = {
    name : '',
    email : '',
    password : '',
    password2: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target

    this.setState({
      [name]:value
    })

  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);

    const newUser = this.state;

    const requestOptions = {
      method:'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({newUser})
    }

    fetch('http://localhost:5000/register',requestOptions)
      .then(res => res.json())
      .then( data => console.log(data) )

  }
  render(){
    return(
      <div style={{marginTop: '80px'}}>
      <div class="row mt-5">
        <div class="col-md-6 m-auto">
          <div class="card card-body">
            <h1 class="text-center mb-3">
              <i class="fas fa-user-plus"></i> Register
            </h1>
            <form onSubmit={this.handleSubmit} action="/users/register" method="POST">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  class="form-control"
                  placeholder="Enter Name"
                  value = {this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control"
                  placeholder="Enter Email"
                  value = {this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  placeholder="Create Password"
                  value = {this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <label for="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  class="form-control"
                  placeholder="Confirm Password"
                  value = {this.state.password2}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Register
              </button>
            </form>
            <p class="lead mt-4">Have An Account? <a href="/users/login">Login</a></p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Register;