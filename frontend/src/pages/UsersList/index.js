import React, {useState, useEffect, useCallback} from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom';

import users from './users';
const UsersList = () => {
    const [paginationCount, setpaginationCount] = useState(1);
    const [pageNo, setpageNo] = useState(1);
    const history = useHistory();
    const { page = 1 } = useParams();
    console.log("LLLLL", page);
    let pageItems = [];

    const pageClicked = (event) => {
        const pageNumber = parseInt(event.target.text);
        setpageNo(pageNumber);
        history.push(`/${pageNumber}`);
    }

    useEffect(() => {
        if(users.length % 20 === 0 ) {
            setpaginationCount(users.length / 20);
        } else {
            setpaginationCount(users.length / 20 + 1);
        }
        
      setpageNo(page);
      }, []);
    //use
    for (let number = 1; number <= paginationCount; number++) {
        console.log("AAAAA");
        pageItems.push(
            <Pagination.Item key={number} active={number === page} onClick={(event) => pageClicked(event)}>
                {number}
            </Pagination.Item>
        );
    }

    const loadUserData = () => {
        return users.map((user, key) => {
            return key >= (pageNo-1)*20 && key < pageNo*20 ? (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.birthDate}</td>
                <td><Button variant="link">Edit</Button></td>
                <td><Button variant="link">Delete</Button></td>
            </tr>) : null        
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