// src/pages/EditEmployee.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../services/employeeService';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../styles/EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employee details');
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleCourseChange = (e) => {
    const selectedCourses = Array.from(e.target.selectedOptions, option => option.value);
    setEmployee({ ...employee, course: selectedCourses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', employee.name);
      formData.append('email', employee.email);
      formData.append('mobile', employee.mobile);
      formData.append('designation', employee.designation);
      formData.append('gender', employee.gender);
      employee.course.forEach(course => formData.append('course[]', course));

      // If a new image is uploaded, add it to formData
      if (employee.image) {
        formData.append('image', employee.image);
      }

      await updateEmployee(id, formData);
      navigate('/employees');
    } catch (err) {
      setError('Error updating employee details');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <Navbar />
      <div className="edit-employee-container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />

          {/* Dropdown for Designation */}
          <select name="designation" value={employee.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>

          {/* Dropdown for Gender */}
          <select name="gender" value={employee.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          {/* Multi-select Dropdown for Course */}
          <select
            name="course"
            value={employee.course}
            onChange={handleCourseChange}
            multiple
          >
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>

          {/* Image Upload */}
          <label>Upload the Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />

          <button type="submit">Update Employee</button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
