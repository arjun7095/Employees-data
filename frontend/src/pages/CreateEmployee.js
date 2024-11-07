import React, { useState } from 'react';
import { createEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreateEmployee.module.css';  // Import the CSS module
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [], // Store selected courses here
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCourseChange = (e) => {
    const selectedCourses = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, course: selectedCourses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);
    formData.course.forEach((course) => data.append('course[]', course));

    await createEmployee(data);
    navigate('/employees');
  };
  return (<>
  <Header/>
  <Navbar/>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.formContainer}>
    <h2>Create Employee</h2>
      <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
      <select name="designation" value={formData.designation} onChange={handleChange}>
        <option value="">Select Designation</option>
        <option value="HR">HR</option>
        <option value="Manager">Manager</option>
        <option value="Sales">Sales</option>
      </select>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select your gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      
      {/* Multi-select dropdown for courses */}
      <select name="course" value={formData.course} onChange={handleCourseChange} required>
        <option value="">select course</option>
        <option value="MCA">MCA</option>
        <option value="BCA">BCA</option>
        <option value="BSC">BSC</option>
      </select>

      <button type="submit">Add Employee</button>
    </form>
    </>);
};

export default CreateEmployee;
