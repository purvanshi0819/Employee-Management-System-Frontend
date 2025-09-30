import axios from "axios";
import api from "./api";

// const REST_API_BASE_URL='http://localhost:8080/api/employees';
const AUTH_API_BASE_URL='http://localhost:8080/auth';

export const listEmployees = () => api.get("");

export const createEmployee = (employee) => api.post("", employee);

export const getEmployee = (employeeId) => api.get(`/${employeeId}`);

export const updateEmployee = (employeeId, employee) => api.put(`/${employeeId}`, employee);

export const deleteEmployee = (employeeId) => api.delete(`/${employeeId}`);

export const loginUser = (user) => axios.post(`${AUTH_API_BASE_URL}/login`, user);

export const registerUser =(user)=> axios.post(`${AUTH_API_BASE_URL}/register`, user);