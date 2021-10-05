import React, {useCallback} from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom';

import users from './users';
const UsersList = () => {
    const history = useHistory();
    const { page = 1 } = useParams();
    console.log("LLLLL", page);
    let pageItems = [];

    const pageClicked = (event) => {
        const pageNumber = parseInt(event.target.text);
        history.push(`/${pageNumber}`);
    }

    //use
    for (let number = 1; number <= users.length / 2; number++) {
        console.log("AAAAA");
        pageItems.push(
            <Pagination.Item key={number} active={number === page} onClick={(event) => pageClicked(event)}>
                {number}
            </Pagination.Item>
        );
    }

    const loadUserData = () => {
        return users.map((user) => {
            return (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.birthDate}</td>
                <td><Button variant="link">Edit</Button></td>
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
        </Container>
    );
}

export default UsersList;