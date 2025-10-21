"use client";

import { useState } from "react";
import styles from "./page.module.css";
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Save,
  X,
  Search,
  AlertCircle,
} from "lucide-react";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Anucha",
      lastName: "Kittisak",
      email: "anucha@hospital.com",
      password: "123456",
      role: "Physician",
      hospital: "Ramathibodi Hospital",
    },
    {
      id: 2,
      firstName: "Mali",
      lastName: "Siriwan",
      email: "mali@hospital.com",
      password: "pass789",
      role: "Pharmacist",
      hospital: "Siriraj Hospital",
    },
    {
      id: 3,
      firstName: "Bee",
      lastName: "Wongchai",
      email: "bee@hospital.com",
      password: "data999",
      role: "Data Entry",
      hospital: "Bangkok Hospital",
    },
  ]);

  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    hospital: "",
  });

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const filteredUsers = users.filter((u) => {
    const matchRole = filterRole === "All" || u.role === filterRole;
    const matchName = u.firstName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchRole && matchName;
  });

  const validateUser = (user: any) => {
    return (
      user.firstName.trim() &&
      user.lastName.trim() &&
      user.email.trim() &&
      user.password.trim() &&
      user.role.trim() &&
      user.hospital.trim()
    );
  };

  const handleAddUser = () => {
    if (!validateUser(newUser)) {
      setError("⚠️ Please fill in all fields before saving.");
      return;
    }
    const newId = Date.now();
    setUsers((prev) => [...prev, { id: newId, ...newUser }]);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      hospital: "",
    });
    setError("");
    setShowAddModal(false);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setError("");
  };

  const handleSaveEdit = () => {
    if (!validateUser(selectedUser)) {
      setError("⚠️ Please fill in all fields before saving.");
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );
    setError("");
    setShowEditModal(false);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const toggleShowPassword = (id: number) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <p className={styles.subtitle}>
        Add, search, and manage users with full admin control
      </p>

      {/* Filter + Search */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label>Filter by Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={styles.selectSmall}
          >
            <option value="All">All</option>
            <option value="Physician">Physician</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Data Entry">Data Entry</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className={styles.searchGroup}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by first name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={() => setShowAddModal(true)} className={styles.addBtn}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* User Table */}
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Hospital</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>
                  {showPassword[u.id] ? u.password : "••••••"}
                  <button
                    className={styles.iconBtn}
                    onClick={() => toggleShowPassword(u.id)}
                    title="Show Password"
                  >
                    {showPassword[u.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </td>
                <td>{u.role}</td>
                <td>{u.hospital}</td>
                <td>
                  <button
                    className={styles.iconBtn}
                    title="Edit User"
                    onClick={() => handleEditUser(u)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className={styles.iconBtn}
                    title="Delete User"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add New User</h3>
            {error && (
              <p className={styles.errorText}>
                <AlertCircle size={16} /> {error}
              </p>
            )}
            <label>First Name</label>
            <input
              type="text"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className={styles.input}
            />
            <label>Last Name</label>
            <input
              type="text"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className={styles.input}
            />
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className={styles.input}
            />
            <label>Password</label>
            <input
              type="text"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className={styles.input}
            />
            <label>Hospital</label>
            <input
              type="text"
              value={newUser.hospital}
              onChange={(e) =>
                setNewUser({ ...newUser, hospital: e.target.value })
              }
              className={styles.input}
            />
            <label>Role</label>
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className={styles.select}
            >
              <option value="">Select Role</option>
              <option value="Physician">Physician</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Admin">Admin</option>
            </select>

            <div className={styles.modalButtons}>
              <button onClick={handleAddUser} className={styles.saveBtn}>
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className={styles.cancelBtn}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit User</h3>
            {error && (
              <p className={styles.errorText}>
                <AlertCircle size={16} /> {error}
              </p>
            )}
            <label>First Name</label>
            <input
              type="text"
              value={selectedUser.firstName}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, firstName: e.target.value })
              }
              className={styles.input}
            />
            <label>Last Name</label>
            <input
              type="text"
              value={selectedUser.lastName}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, lastName: e.target.value })
              }
              className={styles.input}
            />
            <label>Email</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              className={styles.input}
            />
            <label>Password</label>
            <input
              type="text"
              value={selectedUser.password}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, password: e.target.value })
              }
              className={styles.input}
            />
            <label>Hospital</label>
            <input
              type="text"
              value={selectedUser.hospital}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, hospital: e.target.value })
              }
              className={styles.input}
            />
            <label>Role</label>
            <select
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
              className={styles.select}
            >
              <option value="Physician">Physician</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Data Entry">Data Entry</option>
              <option value="Admin">Admin</option>
            </select>

            <div className={styles.modalButtons}>
              <button onClick={handleSaveEdit} className={styles.saveBtn}>
                <Save size={16} /> Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className={styles.cancelBtn}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
