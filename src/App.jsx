import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the user list

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

  return (
    <div className="app-container">
      <h1>User Management</h1>
      {/* Display the list of users */}
      <UserList
        users={users} // Pass the user list as a prop
      />
    </div>
  );
};
export default App;
