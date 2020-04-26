import React, { Component } from 'react';
import {withRouter , Link} from "react-router-dom";
import  {Alert}  from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import axios from 'axios';

class Login extends Component{

  state = {
    user:{
      email : '',
      password: ''
    },
    disable: false,
    showSpinner: false,
    visible: false,
    error: ''
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

  authorizeUser = (data) => {
    if(data.authorized){
      this.setState({
        disable: true,
        showSpinner: true
      })
  
      setTimeout(
        function() {
          this.props.history.push("/dashboard")
        }
        .bind(this),
        2000
      );
    }else{
      this.setState({
        visible: true,
        error: data.error
      })
    }
    
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = this.state.user

    // console.log(user)

    // const sendData = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json'},
    //   body: JSON.stringify(user)
    // }

    axios.post('http://localhost:5000/login', user, { withCredentials: true })
    .then(res => {
      if(res.status === 200){
        // this.props.updateUser(res.data)

        // console.log(this.props.updateUser
        // this.props.updateUser.loggedIn = true
        this.props.history.push("/dashboard")
      }
    }).catch(err => {
      console.log('login error: ');
      console.log(err);
    })

      // fetch('http://localhost:5000/login',sendData)
      // .then(res => res.json())
      // .then( data => this.authorizeUser(data) )
      // .catch(err => console.log('err: ', err))
    
  }
  
  render(){
    return (
      <div style={{marginTop: '80px'}}>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
              {this.state.visible && 
                <Alert variant="warning" refs="test"  onClose={ () => this.setState({visible:false})} dismissible>
                <p>
                  {this.state.error}
                </p>
              </Alert>
              }
              
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
                    autoComplete ="email"
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
                    autoComplete ="current-password"
                    value={this.state.user.password}
                  />
                </div>
                <button disabled={this.state.disable} type="submit" style={{position:'relative'}} className="btn btn-primary btn-block">Login
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

export default withRouter(Login);