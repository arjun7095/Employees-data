// src/services/employeeService.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/employees';

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
// Get the employee details
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Assuming the data is directly in the response body
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];  // Return an empty array in case of an error
  }
};
//Creating the Employee details
export const createEmployee = async (data) => {
  alert(data.name)
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData, getConfig());
  return response.data;
};
//Delete the employee
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getConfig());
    return response.data;
  };