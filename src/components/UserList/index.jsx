import "./index.css";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-table">
      {/* Table header */}
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Render a table row for each user */}
        {users.map((user) => (
          <tr key={user.id}>
            {/* Display user ID */}
            <td>{user.id}</td>

            {/* Extract and display the first name (assumes the full name is space-separated) */}
            <td>{user.name.split(" ")[0]}</td>

            {/* Extract and display the last name (handles cases where a last name might not exist) */}
            <td>{user.name.split(" ")[1] || ""}</td>

            {/* Display user email */}
            <td>{user.email}</td>

            {/* Action buttons for editing and deleting the user */}
            <td>
              {/* Edit button calls the onEdit callback with the current user */}
              <button className="edit-btn" onClick={() => onEdit(user)}>
                Edit
              </button>

              {/* Delete button calls the onDelete callback with the current user's ID */}
              <button className="delete-btn" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UserList;
