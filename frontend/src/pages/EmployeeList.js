import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import { Link } from 'react-router-dom';
import styles from '../styles/EmployeeList.module.css'; // Import the CSS module
import Header from '../components/Header.js';
import Navbar from '../components/Navbar';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Store the employee ID to delete

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        if (Array.isArray(data)) {
          setEmployees(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id); // Set the employee ID for confirmation
    setShowModal(true); // Show the confirmation modal
  };

  const handleDelete = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete);
        setEmployees(employees.filter((emp) => emp._id !== employeeToDelete));
        setShowModal(false); // Close the modal after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal without deleting
  };

  return (
    <>
    <Header/>
    <Navbar/>
    <div className={styles['employee-list-container']}>
      <h2>Employee List</h2>
      <Link to="/employees/create">Add Employee</Link>
      <table className={styles['employee-list-table']} border="1">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  {emp.image && (
                    <img
                      src={emp.image}
                      alt={emp.name}
                      className={styles['employee-image']}
                    />
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.gender}</td>
                <td>{emp.course.join(', ')}</td>
                <td className={styles['actions']}>
                  <Link to={`/employees/edit/${emp._id}`}>Edit</Link>
                  <button onClick={() => handleDeleteClick(emp._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles['no-employees']}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <h3>Are you sure you want to delete this employee?</h3>
            <div className={styles['modal-buttons']}>
              <button className="confirm" onClick={handleDelete}>Yes</button>
              <button className="cancel" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>);
};

export default EmployeeList;
