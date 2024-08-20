import React, { useEffect, useState } from 'react';
import './Users.css';
import Sidebar from './Sidebar';
import ConfirmationModal from './ConfirmationModal';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUserApplications, setSelectedUserApplications] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/getalluseronly');
        if (response.data) {
          const data = response.data;
          console.log(data);
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            console.error('Data is not an array', data);
          }
        }
        else{

          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/getall');
        if (response.data) {
          const data = response.data;
          setApplications(data);
        }
        else{
          throw new Error('Network response was not ok.');

        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchUsers();
    fetchApplications();
  }, []);

  const handleDelete = async () => {
    try {
      if (userToDelete) {
        const response = await fetch(`http://localhost:8080/user/deleteUser/${userToDelete}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(users => users.id !== userToDelete));
          setUserToDelete(null);
          setShowConfirmModal(false);
        }
        else{
          
          throw new Error('Network response was not ok.');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Pending':
        return 'status-pending';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const getApplicationCount = (userId) => {
    return applications.filter(app => app.userId === userId).length;
  };

  const fetchUserApplications = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/data/getbyid/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.data;
      setSelectedUserApplications(data);
    } catch (error) {
      console.error('Error fetching user applications:', error);
    }
  };

  const openConfirmModal = async (userId) => {
    setUserToDelete(userId);
    setShowConfirmModal(true);
    await fetchUserApplications(userId); 
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setUserToDelete(null);
  };

  const renderUserApplications = () => (
    <div className='user-applications-list'>
      <h4>Applications Submitted by User</h4>
      {selectedUserApplications.length > 0 ? (
        <ul>
          {selectedUserApplications.map(application => (
            <li key={application.id}>
              <p><strong>Application ID:</strong> {application.id}</p>
              <p><strong>Loan Amount:</strong> {application.loanAmount}</p>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Submitted At:</strong> {new Date(application.submittedAt).toLocaleDateString()}</p>
            
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found for this user.</p>
      )}
    </div>
  );

  return (
    <div className='main-container-admin'>
      <AdminNavbar/>
      <Sidebar />
      <div className='user-container'>
        <h2>Users</h2>
        <div className='user-summary-card'>
          <h3>Total Users: {users.length}</h3>
        </div>
        <div className='user-cards-container'>
          {users.map((user) => (
            <div className='user-card' key={user.id}>
              <div className='user-card-header'>
                {/* <img src={user.avatar || 'default-avatar.png'} alt='User Avatar' /> */}
                <h4>{user.username}</h4>
              </div>
              <p><strong>User Id:</strong> {user.userId}</p>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Phone Number:</strong> {user.mobileNumber}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Date Joined:</strong> {new Date(user.dateOfJoining).toLocaleDateString()}</p>
              <p><strong>Time Joined:</strong> {user.timeOfJoining}</p>
              <p><strong>Applications Submitted:</strong> {getApplicationCount(user.id)}</p>
              <p className={`status ${getStatusClass(user.status)}`}>
                {user.status}
              </p>
              <div className='button-container'>
                <button className='button-edit'>Edit</button>
                <button className='button-delete-user' onClick={() => openConfirmModal(user.userId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onCancel={closeConfirmModal}
          content={renderUserApplications()} 
        />
      )}
    </div>
  );
};

export default Users;
