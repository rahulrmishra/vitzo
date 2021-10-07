import React, { useState, useEffect} from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import './index.css'
const UsersList = (props) => {
    const [paginationCount, setpaginationCount] = useState(1);
    const [pageNo, setpageNo] = useState(1);
    const [userList, setUserList] = useState([]);
    const history = useHistory();
    const { page = 1 } = useParams();
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => { 
        setShow(false) 
    };
    const handleShow = (id) => {
        setShow(true);
        setSelectedUserId(id)
    }
    
    let pageItems = [];

    const pageClicked = (event) => {
        const pageNumber = parseInt(event.target.text);
        setpageNo(pageNumber);
        loadApiUserData(pageNumber);
        history.push(`/${pageNumber}`); 
    }
    const NavigatetoAddUser = (event) => {
        history.push(`/addUser`);
    }
    const NavigatetoEditUser = (id, fName, lName, dob) => {
        props.history.push({
            pathname: `/editUser/${id}`,
            state: [{
                userId: id,
                firstName: fName,
                lastName: lName,
                dob: dob
            }] // your data array of objects
          })
    }
    useEffect(() => {      
      setpageNo(page);
      loadApiUserData(page);
      }, []);

    //use
    for (let number = 1; number <= paginationCount; number++) {
        pageItems.push(
            <Pagination.Item key={number} active={number === pageNo} onClick={(event) => pageClicked(event)}>
                {number}
            </Pagination.Item>
        );
    }

    const loadApiUserData = (pageno) => {
        const options = {method: 'GET', headers: {Accept: 'application/json'}};
        fetch(`http://localhost:8080/users.php?pageNo=${pageno-1}`, options)
            .then(response => response.json())
            .then(response => {
                setUserList(response.records);
                if(response.count % 20 === 0 ) {
                    setpaginationCount(response.count / 20);
                } else {
                    setpaginationCount(response.count / 20 + 1);
                }
            })
            .catch(err => console.error(err));
        }

    const deleteUser = () => {
        fetch(`http://localhost:8080/users.php?id=${selectedUserId}`, { method: 'DELETE' })
        .then(() => {
            setShow(false); 
            loadApiUserData(page);
        });
    }

    const loadUserData = () => {
        return userList.map((user) => {
            return (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.dob}</td>
                <td><Button variant="link" onClick={() => NavigatetoEditUser(user.id,user.firstName,user.lastName,user.dob)}>Edit</Button></td>
                <td><Button variant="link" onClick={() => handleShow(user.id)}>Delete</Button></td>
            </tr>)       
        })
    }

    const loadUserList = () => {
        return <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {loadUserData()}
            </tbody>
        </Table>
    }
    return (
        <Container>
            <h5> Users List </h5>
            {loadUserList()}
            <Pagination>{pageItems}</Pagination>
            <Button className="addBtn" variant="primary" onClick={NavigatetoAddUser}>Add user</Button>

            <Modal show={show} onHide={handleClose}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>Are you sure to delete this user?</Modal.Body>
                <Modal.Footer> 
                <Button variant="primary" onClick={deleteUser}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default UsersList;