import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onAddUser, onUpdateUser, editingUser, setEditingUser }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "Development",
    });

    useEffect(() => {
        if (editingUser) {
            setFormData({
                firstName: editingUser.name.split(' ')[0],
                lastName: editingUser.name.split(' ')[1],
                email: editingUser.email,
                department: "Development",
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                department: "Development",
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email } = formData;
        if (!firstName || !lastName || !email) {
            alert("Please fill in all fields.");
            return;
        }

        if (editingUser) {
            onUpdateUser({ ...editingUser, name: `${firstName} ${lastName}`, email });
        } else {
            onAddUser({ name: `${firstName} ${lastName}`, email });
        }
        setFormData({ firstName: "", lastName: "", email: "", department: "Development" });
        setEditingUser(null);
    };

    return (
        <div className="user-form">
            <h2>{editingUser ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingUser ? "Update" : "Add"}</button>
                {editingUser && (
                    <button type="button" onClick={() => setEditingUser(null)}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default UserForm;