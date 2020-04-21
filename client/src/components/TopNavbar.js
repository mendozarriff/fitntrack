import React from 'react';
import { Navbar, NavDropdown, Nav , Button, Form, FormControl} from 'react-bootstrap';
import {Link} from "react-router-dom";

function TopNavbar(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home"><Link to='/'>FitNtrack</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features"><Link to='/set-workout'>Set Workout</Link></Nav.Link>
      <Nav.Link href="#pricing"><Link to='/dashboard'>Dashboard</Link></Nav.Link>
      <Nav.Link href="#pricing"><Link to='/register'>Register</Link></Nav.Link>
      {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}

export default TopNavbar;