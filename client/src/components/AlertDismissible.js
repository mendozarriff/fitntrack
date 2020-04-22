
import React, { useState } from 'react';
import  {Container, ListGroup, Form, Button, Jumbotron, Modal,Table, Alert}  from 'react-bootstrap';
function AlertDismissible() {

  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
    );
  }
}

export default AlertDismissible;