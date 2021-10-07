import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const EditUser = (props) => {    
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [editDOB, setEditDOB] = useState('');
    const [DOB, setDOB] = useState('');
    const [userID, setUserID] = useState(0);
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    const { state } = props.location;
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
            setEditDOB(dateStr);
            setDOB(value);
            console.log('DOB: ', dateStr);
        }
    }
    useEffect(() => {
        console.log('props', state[0]);
        setFirstName(state[0].firstName);
        setlastName(state[0].lastName);
        changeFormate(state[0].dob);
        setUserID(state[0].userId);
        // setDOB(changeFormate(state[0].dob));
    }, [])
    const changeFormate = (date) => {
        if(date){
            setEditDOB(date);
            const dateArr = date.split('/');
            console.log('dateArr:',dateArr);
            const dateStr = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
            setDOB(dateStr);
            console.log('DOB: ', dateStr);
        }
    }
    const editUser = () => {
        setValidated(true);
        if(!(firstName && firstName.length> 0 && lastName && lastName.length> 0 && DOB && DOB.length> 0)) {
            return;
        }
        const req = {
            firstName: firstName,
            lastName: lastName,
            dob: editDOB,
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        };
        fetch(`http://localhost:8080/users.php?id=${userID}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            history.push(`/`);
        });
    }

    const cancelEdit = () => {
        setFirstName(state[0].firstName);
        setlastName(state[0].lastName);
        changeFormate(state[0].dob);
        setUserID(state[0].userId);
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs md='8' lg='6'>
                    <h4>Edit USER</h4>          
                    <Form noValidate validated={validated}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={firstName} type="text" name='firstName' isInvalid={validated && !(firstName && firstName.length > 0)} placeholder="first name" onChange={(event) => getFirstName(event.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter first name.
                            </Form.Control.Feedback>
                       </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={lastName} type="text" name='lastName' isInvalid={validated && !(lastName && lastName.length > 0)} placeholder="last name" onChange={(event) => getLastName(event.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control value={DOB} type="date" name='dob' isInvalid={validated && !(DOB && DOB.length > 0)} placeholder="Date of birth" onChange={(event) => getDOB(event.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter date of birth.
                            </Form.Control.Feedback>  
                        </Form.Group>           
                        <Button className='formBtn' variant="primary" onClick={editUser}>Edit</Button>
                        <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditUser;