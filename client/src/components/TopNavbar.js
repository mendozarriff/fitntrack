import React from 'react';
import { Nav,Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";

class TopNavbar extends React.Component{
 render(){
  //  console.log('Navbar - this.props.user: ', this.props.user)
  return (
    <div>
    {this.props.user && <h1 style={{ position: 'fixed', zIndex: '3', fontSize: '13px'}}>{this.props.user.name}</h1>}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     
        <Navbar.Brand>
          <Link to='/'>FitNtrack</Link>
        </Navbar.Brand>
      
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="pull-right">
          <Nav.Link href="/set-workout">Set Workout</Nav.Link>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
</Navbar>

</div>
  )
 }
  
}

export default TopNavbar;