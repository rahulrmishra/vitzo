import React from 'react';
import { Container, Table, Button } from 'react-bootstrap'

import users from './users';
const UsersList = () => {

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
        </Container>
    );
}

export default UsersList;