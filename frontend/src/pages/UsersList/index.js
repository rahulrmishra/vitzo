import React, {useState, useEffect, useCallback} from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom';

import users from './users';
import './index.css'
const UsersList = (props) => {
    const [paginationCount, setpaginationCount] = useState(1);
    const [pageNo, setpageNo] = useState(1);
    const [userList, setUserList] = useState([]);
    const history = useHistory();
    const { page = 1 } = useParams();
    console.log("LLLLL", page);
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
                    // setpaginationCount(users.length / 20);
                } else {
                    setpaginationCount(response.count / 20 + 1);
                    // setpaginationCount(users.length / 20 + 1);
                }
            })
            .catch(err => console.error(err));
        }

    const loadUserData = () => {
        // return users.map((user, key) => {
        return userList.map((user) => {
            return (<tr key={user.id}>
                {/* return key >= (pageNo-1)*20 && key < pageNo*20 ? (<tr key={user.id}> */}
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                {/* <td>{user.birthDate}</td> */}
                <td>{user.dob}</td>
                <td><Button variant="link" onClick={() => NavigatetoEditUser(user.id,user.firstName,user.lastName,user.dob)}>Edit</Button></td>
                <td><Button variant="link">Delete</Button></td>
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
            <p>
                Users List
            </p>
            {loadUserList()}
            <Pagination>{pageItems}</Pagination>
            <Button className="addBtn" variant="primary" onClick={NavigatetoAddUser}>Add New user</Button>
        </Container>
    );
}

export default UsersList;