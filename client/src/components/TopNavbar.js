import React from 'react';
import { Navbar, NavDropdown, Nav , NavItem,  Button, Form, FormControl} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function TopNavbar(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     
        <Navbar.Brand>
          <Link to='/'>FitNtrack</Link>
        </Navbar.Brand>
      
      
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="pull-right">
          <LinkContainer to='/set-workout'><NavItem className="pl-4">Set Workout</NavItem></LinkContainer>
          <LinkContainer to='/dashboard'><NavItem className="pl-4">Dashboard</NavItem></LinkContainer>
          <LinkContainer to='/register'><NavItem className="pl-4">Register</NavItem></LinkContainer>
        </Nav>
      </Navbar.Collapse>
</Navbar>
  )
}

export default TopNavbar;