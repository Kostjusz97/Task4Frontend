import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BsLock, BsUnlock } from 'react-icons/bs';
import axios from '../../axios';
import './buttonGroupStyles.css';

function ButtonGroup({ selectedUsers, updateTableData ,handleToggleLogout}) {
  const navigate = useNavigate();

  const userIdClient = localStorage.getItem('userId')
  
  const handleBlockClick = () => {
    axios.put('/users/status', { userIds: selectedUsers, status: 'blocked' })
      .then(response => {
        console.log(response.data);
        updateTableData(true);
        const userIdAsNumber = parseInt(userIdClient, 10);

        if (selectedUsers.includes(userIdAsNumber)) {
          handleToggleLogout()
          navigate('/login');
          return;
        }
      })
      .catch(error => console.error(error));
  };

  const handleUnblockClick = () => {
    axios.put('/users/status', { userIds: selectedUsers, status: 'active' })
      .then(response => {
        console.log(response.data);
        updateTableData();

      })
      .catch(error => console.error(error));
  };

  const handleDeleteClick = () => {
    axios.delete('/users/remove', { data: { userIds: selectedUsers } })
      .then(response => {
        console.log(response.data);
        updateTableData();
        console.log(selectedUsers);
        console.log(userIdClient);
        const userIdAsNumber = parseInt(userIdClient, 10);
        console.log(userIdAsNumber);
        if (selectedUsers.includes(userIdAsNumber)) {
          handleToggleLogout()
          navigate('/login');
          return;
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className='buttonGroup'>
      <Button variant="warning" onClick={handleBlockClick}>
        <BsLock className="mr-2" />
        Block
      </Button>
      <Button variant="success" onClick={handleUnblockClick}>
        <BsUnlock className="mr-2" />
        Unblock
      </Button>
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete
      </Button>
    </div>
  );
}

export default ButtonGroup;
