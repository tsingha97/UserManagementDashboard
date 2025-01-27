import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the user list
  const [selectedUser, setSelectedUser] = useState(null); // State to hold the user being edited or null if creating a new user
  const [formVisible, setFormVisible] = useState(false); // State to control the visibility of the user form

  // Fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetching user list from mock API
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data); // Updating state with fetched data
    } catch (error) {
      alert("Failed to fetch users. Please try again."); // Handle error gracefully
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null); // Clear selected user
    setFormVisible(true); // Show the form
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Set the selected user
    setFormVisible(true); // Show the form
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); // Simulate API delete
        setUsers(users.filter((user) => user.id !== id)); // Remove user from state
      } catch (error) {
        alert("Failed to delete user. Please try again."); // Show an error message if API call fails
      }
    }
  };

  const handleFormSubmit = async (user) => {
    try {
      if (user.id) {
        // If the user has an ID, update the existing user
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          user
        );
        // Update the local user list with the updated user data
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
      } else {
        // If no ID, add a new user
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          user
        );
        // Add the new user to the local user list
        setUsers([...users, { ...user, id: response.data.id }]);
      }
      setFormVisible(false); // Hide the form after submission
    } catch (error) {
      alert("Failed to save user. Please try again."); // Show an error message if API call fails
    }
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      {formVisible ? (
        // Show the user form if `formVisible` is true
        <UserForm
          user={selectedUser} // Pass the selected user for editing
          onCancel={() => setFormVisible(false)} // Close the form on cancel
          onSubmit={handleFormSubmit} // Handle form submission
        />
      ) : (
        <>
          {/* Button to add a new user */}
          <button className="add-user-btn" onClick={handleAddUser}>
            Add User
          </button>

          {/* Display the list of users */}
          <UserList
            users={users} // Pass the user list as a prop
            onEdit={handleEditUser} // Handle edit action
            onDelete={handleDeleteUser} // Handle delete action
          />
        </>
      )}
    </div>
  );
};
export default App;
