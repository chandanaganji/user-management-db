import React, { useState, useEffect } from 'react';
import './UserList.css';
import Pagination from '../Pagination/Pagination';
import UserForm from '../UserForm/UserForm'; // Import the UserForm component

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [isAddingUser, setIsAddingUser] = useState(false); // State for showing/hiding the form
    const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data.map((user) => ({ ...user, id: user.id }))); // Ensure unique IDs
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users. Please try again later.");
            }
        };

        fetchUsers();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleAddUser = (newUser) => {
        setUsers([...users, { ...newUser, id: Math.max(...users.map((u) => u.id)) + 1, department: 'Development' }]);
        setIsAddingUser(false); // Hide the form after adding
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsAddingUser(true); // Show the form in edit mode
    };

    const handleUpdateUser = (updatedUser) => {
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
        setIsAddingUser(false);
    };


    return (
        <div className="user-list">
            {error && <div className="error-message">{error}</div>} {/* Display error message */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name.split(' ')[0]}</td>
                            <td>{user.name.split(' ')[1]}</td>
                            <td>{user.email}</td>
                            <td>Development</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Edit</button> {/* Edit button */}
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditionally render the UserForm */}
            {isAddingUser && (
                <UserForm
                    onAddUser={handleAddUser}
                    onUpdateUser={handleUpdateUser}
                    editingUser={editingUser}
                    setEditingUser={setEditingUser}
                />
            )}
            {!isAddingUser && <button onClick={() => setIsAddingUser(true)}>Add User</button>}

            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default UserList;