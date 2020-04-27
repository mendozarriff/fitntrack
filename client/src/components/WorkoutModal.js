import React from 'react';
import  {Button, Modal}  from 'react-bootstrap';

function WorkoutModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title style={{textTransform:"capitalize"}} id="contained-modal-title-vcenter">
          Modal title
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <p>
         You have already submitted a workout for today, would you like to replace it?
        </p>
        <div className="d-flex justify-content-around">
          <Button onClick={props.updateWorkout}>Yes</Button>
          <Button onClick={props.onHide}>No</Button>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default WorkoutModal;