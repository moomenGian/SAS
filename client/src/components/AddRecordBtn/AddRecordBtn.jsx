import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Modal.scss'

async function sendRecord(datas) {
  console.log(JSON.stringify(datas));
  //validate input
  const {sectionName, adviser, violator, violation, witness, date} = datas
  if(!sectionName || !adviser || !violator || !violation || !witness || !date){
    return
  }

  try {
    const response = await fetch('http://localhost:3000/insertRecord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    });

    if (!response.ok) {
      throw new Error('Error inserting record');
    }

    
    // window.location.reload()
    
  } catch (error) {
    console.error('Error inserting record', error);
  }

}


function Mudal({section_Name}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); console.log(JSON.stringify( {sectionName, adviser, violator, violation, witness, date}));};
  const handleShow = () => {setShow(true); setSectionName(section_Name); console.log(section_Name);};

  const [sectionName, setSectionName] = useState('')
  const [adviser, setAdviser] = useState('')
  const [violator, setViolator] = useState('')
  const [violation, setViolation] = useState('')
  const [witness, setWitness] = useState('')
  const [date, setDate] = useState(new Date().toLocaleDateString().replaceAll('/','-'))

  const closeIcon = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z\'/%3E%3C/svg%3E'

  
  return (
    <div className='use-css'>
      <Button variant="primary" onClick={handleShow}>
        Add New Record
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New Record</Modal.Title>
          <img src={closeIcon} alt="closeIcon" className='close-icon' onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <FloatingLabel controlId="floatingInput" >
                <input type="text" placeholder="Adviser" onChange={(e) => {setAdviser(e.target.value)}} required />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput">
                <input type="text" placeholder="Violator's Name" onChange={(e) => {setViolator(e.target.value)}} required />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput">
                <input type="text" placeholder='Violation Description' onChange={(e) => {setViolation(e.target.value)}} required />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput">
                <input type="text" placeholder='Witness' onChange={(e) => {setWitness(e.target.value)}} required />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput">
                <input type="date" name="" id="" className='date-input-record' onChange={(e) => {setDate(e.target.value)}} required/>
              </FloatingLabel>
              

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => {
                    console.log(JSON.stringify({sectionName, adviser, violator, violation, witness, date}));
                    sendRecord({sectionName, adviser, violator, violation, witness, date});
                  }}>Save Changes
                </Button>
              </Modal.Footer>
              
              
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );

}

export default Mudal;