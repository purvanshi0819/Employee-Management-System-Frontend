import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";
import styles from './ListEmployeeComponent.module.css'

const ListEmployeeComponent = () => {
    const [employees, setemployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getemployees();
    }, []);

    function getemployees(){
        listEmployees()
            .then((response) => {
                setemployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function addNewEmployee() {
        navigator("/add-employee");
    }

    function updateEmployee(id){
        navigator(`/update-employee/${id}`);
    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
            getemployees();
        }).catch(error=>{
            console.error(error);
        })
    }

    return (
        <div className={styles.container}>
            <h1>List of Employees</h1>
            <button className={styles.btnPrimary} onClick={addNewEmployee}>
                Add employee
            </button>
            <table className={`${styles.table} ${styles.tableStriped} ${styles.tableBordered}`}>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className={styles.btnWarning} onClick={()=> updateEmployee(employee.id)}>Update</button> 
                            <button className={styles.btnDanger} onClick={()=> removeEmployee(employee.id)} style={{marginLeft: "15px"}}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
