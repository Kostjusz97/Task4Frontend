import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import ButtonGroup from '../buttonGroup';
import axios from '../../axios';

import './tableStyle.css';

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function MainTable({handleToggleLogout}) {
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  useEffect(() => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
        console.log(response);
      })
      .catch(error => console.error(error));
  }, []);     

  const updateTableData = () => {
    axios.get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return ( 
    <div className='tableMain'> 
      <ButtonGroup selectedUsers={selectedUsers} updateTableData={updateTableData} handleToggleLogout={handleToggleLogout}/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedUsers.length === users?.length}
              />
            </th>
            <th>Name</th>
            <th>e-Mail</th>
            <th>Registration Date</th>
            <th>Last login</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users !== null && users.map(user => (
            <tr key={user.id} className={`bg-${user.status === 'blocked' ? 'secondary' : 'light'}`}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(user.id)}
                  checked={selectedUsers.includes(user.id)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.registrationDate)}</td> 
              <td>{formatDate(user.lastLoginDate)}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MainTable;
