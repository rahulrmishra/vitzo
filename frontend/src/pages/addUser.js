import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Button } from 'react-bootstrap';
import './addUser.css';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [DOB, setDOB] = useState('');

    const getFirstName = (value) => {
        console.log('date: ', value);
    }
    const getLastName = (value) => {
        console.log('date: ', value);
    }
    const getDOB = (value) => {
        console.log('date: ', value);
    }
    return (
        <Container>
            <p>
            Add USER
            </p>          
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
                <Button className='formBtn' variant="primary">Add</Button>
                <Button variant="secondary">Cancel</Button>
            </Form>
        </Container>
    );
};

export default AddUser;