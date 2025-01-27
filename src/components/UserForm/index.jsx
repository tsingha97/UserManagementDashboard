import { useState, useEffect } from "react";
import "./index.css";

// Component to handle adding or editing a user
const UserForm = ({ user, onCancel, onSubmit }) => {
  // State to store the form data for the user (id, name, and email)
  const [formData, setFormData] = useState({ id: null, name: "", email: "" });

  // Effect to populate the form when the `user` prop is passed
  useEffect(() => {
    if (user) {
      setFormData(user); // Prefill the form with user details
    }
  }, [user]); // Runs whenever the `user` prop changes

  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the changed input
    setFormData({ ...formData, [name]: value }); // Update the state with the new value
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for empty fields
    if (!formData.name || !formData.email) {
      alert("Please fill out all fields.");
      return;
    }

    onSubmit(formData); // Call the parent submit function
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {/* Input for the user's full name */}
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name" // This corresponds to the `name` property in the state
          value={formData.name} // Controlled input bound to state
          onChange={handleChange} // Update state on user input
        />
      </div>

      {/* Input for the user's email */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email" // This corresponds to the `email` property in the state
          value={formData.email} // Controlled input bound to state
          onChange={handleChange} // Update state on user input
        />
      </div>

      {/* Action buttons: Cancel and Save */}
      <div className="form-actions">
        {/* Cancel button to trigger the `onCancel` callback */}
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>

        {/* Save button to submit the form */}
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
