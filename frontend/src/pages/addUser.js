import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './addUser.css';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [DOB, setDOB] = useState('');
    const history = useHistory();
    const [validated, setValidated] = useState(false);
  
    const getFirstName = (value) => {
        console.log('first Name: ', value);
        setFirstName(value);
    }
    const getLastName = (value) => {
        console.log('last Name: ', value);
        setlastName(value);
    }
    const getDOB = (value) => {
        if(value){
            const dateArr = value.split('-');
            console.log('dateArr:',dateArr);
            const dateStr = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
            setDOB(dateStr);
            console.log('DOB: ', dateStr);
        }
    }

    const cancelAdd = () => {
        history.push(`/`);
        
    }

    const addUser = () => {
      setValidated(true);
      if(!(firstName && firstName.length> 0 && lastName && lastName.length> 0 && DOB && DOB.length> 0)) {
          return;
      }
        const req = {
            firstName: firstName,
            lastName: lastName,
            dob: DOB,
        }
        console.log('req', req); 
        const options = {
            method: 'POST', 
            headers: {
                accept: 'application/json', 
                'Content-Type': 'application/json'}, 
            body: JSON.stringify(req)
        };
        return fetch('http://localhost:8080/users.php', options)
          .then(response => response.json())
            .then(data => {
                console.log(data); 
                history.push(`/`);
            });  
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md='8' lg='6'>
                    <p>Add USER</p>          
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name='firstName' isInvalid={validated && !(firstName && firstName.length > 0)} placeholder="first name" onChange={(event) => getFirstName(event.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup hasValidation>
                            <Form.Control type="text" name='lastName' isInvalid={validated && !(lastName && lastName.length > 0)} placeholder="last name" onChange={(event) => getLastName(event.target.value)} required/>    
                            <Form.Control.Feedback type="invalid">
                                Please enter last name.
                            </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control type="date" name='dob' isInvalid={validated && !(DOB && DOB.length > 0)} placeholder="Date of birth" onChange={(event) => getDOB(event.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter date of birth.
                            </Form.Control.Feedback>
                        </Form.Group>           
                        <Button className='formBtn' variant="primary" onClick={addUser}>Add</Button>
                        <Button variant="secondary" onClick={cancelAdd}>Cancel</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;