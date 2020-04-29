import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ResetPassword extends Component {
  render(){
    return <div>
          <div style={{marginTop: '80px'}}>
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Reset Password</h1>
              {/* {this.state.visible && 
                <Alert variant="warning" refs="test"  onClose={ () => this.setState({visible:false})} dismissible>
                <p>
                  {this.state.error}
                </p>
              </Alert>
              } */}
              
              {/* <form method="POST" onSubmit = {this.handleSubmit}> */}
              <form method="POST">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    // onChange={this.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    autoComplete ="email"
                    // value={this.state.user.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    // onChange={this.handleChange}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    autoComplete ="current-password"
                    // value={this.state.user.password}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm New Password</label>
                  <input
                    // onChange={this.handleChange}
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Re-Enter Password"
                    autoComplete ="current-password"
                    // value={this.state.user.password}
                  />
                </div>
                {/* <button disabled={this.state.disable} type="submit" style={{position:'relative'}} className="btn btn-primary btn-block">Login */}
                <button type="submit" style={{position:'relative'}} className="btn btn-primary btn-block">Change Password
                {/* <Loader
                style={{position: 'absolute', top:'-3px', right:'5px'}}
                type="Rings"
                color="white"
                height={40}
                width={40}
                visible={this.state.showSpinner}
              /> */}
                </button>
              </form>
              <p className="lead mt-4">
                <Link to="login">Go back</Link>
              </p>
              
            </div>
          </div>
        </div>
      </div>

    </div>
  }
}

export default ResetPassword;