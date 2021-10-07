import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Button, Row, Col } from 'react-bootstrap';
import './addUser.css';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [DOB, setDOB] = useState('');

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

    const addUser = () => {
        const req = {
            firstName: firstName,
            lastName: lastName,
            dob: DOB,
        }
        console.log('req', req);
        return fetch('http://localhost:8080/users.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req)
          })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md='8' lg='6'>
                    <p>Add USER</p>          
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="first name" onChange={(event) => getFirstName(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="last name" onChange={(event) => getLastName(event.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control type="date" placeholder="Date of birth" onChange={(event) => getDOB(event.target.value)} />
                            {/* <DatePicker /> */}
                            {/* <DatePicker id="example-datepicker" value={new Date().toISOString()} /> */}
                        </Form.Group>           
                        <Button className='formBtn' variant="primary" onClick={addUser}>Add</Button>
                        <Button variant="secondary">Cancel</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;