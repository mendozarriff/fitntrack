import React from 'react';
import  {Button, Modal}  from 'react-bootstrap';

function ExerciseDescriptionModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{textTransform:"capitalize"}} id="contained-modal-title-vcenter">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Header>
      <img style={{width:'100%'}} src={props.modalGif} alt=""/>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.modalDescription}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExerciseDescriptionModal;