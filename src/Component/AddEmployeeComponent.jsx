import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddEmployeeComponent.module.css'

const AddEmployeeComponent = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");

    const { id } = useParams();

    const [errors, seterrors] = useState({});

    const navigator = useNavigate();

    function validateForm() {
        const formErrors = {};
        let isValid = true;

        if (!firstName.trim()) {
            formErrors.firstName = "First Name is required";
            isValid = false;
        }

        if (!lastName.trim()) {
            formErrors.lastName = "Last Name is required";
            isValid = false;
        }

        if (!email.trim()) {
            formErrors.email = "Email is required";
            isValid = false;
        } else {
            // simple email regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formErrors.email = "Enter a valid email";
                isValid = false;
            }
        }

        seterrors(formErrors);
        return isValid;

    }

    useEffect(
        () => {
            if (id) {
                getEmployee(id).then((response) => {
                    setfirstName(response.data.firstName);
                    setlastName(response.data.lastName);
                    setemail(response.data.email);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
        , [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log(response);
                    navigator("/employees");
                }).catch(error=>{
                    console.error(error);
                })
            }
            else{
                createEmployee(employee).then(response => {
                console.log(response.data);
                navigator("/employees")
                }).catch(error=>{
                    console.error(error);
                })
            }
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <br /><br />
                <div className={styles.row}>
                    <div className={`${styles.card} ${styles.colMd6} ${styles.offsetMd3}`}>
                        {(id) ? <h2 className={styles.textCenter}>Update Employee</h2> : <h2 className={styles.textCenter}>Add Employee</h2>}
                        <div className={styles.cardBody}>
                            <form>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>First Name: </label>
                                    <input
                                        type='text'
                                        placeholder='Enter Employee First Name'
                                        name='firstName'
                                        value={firstName}
                                        className={`${styles.formControl} ${errors.firstName ? `${isInvalid}` : ""}`}
                                        onChange={(e) => setfirstName(e.target.value)}></input>
                                    {errors.firstName && <div className={styles.invalidFeedback}>{errors.firstName}</div>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Last Name: </label>
                                    <input
                                        type='text'
                                        placeholder='Enter Employee Last Name'
                                        name='lastName'
                                        value={lastName}
                                        className={`${styles.formControl} ${errors.lastName ? `${isInvalid}` : ""}`}
                                        onChange={(e) => setlastName(e.target.value)}></input>
                                    {errors.lastName && <div className={styles.invalidFeedback}>{errors.lastName}</div>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Email: </label>
                                    <input
                                        type='email'
                                        placeholder='Enter Employee Email'
                                        name='email'
                                        value={email}
                                        className={`${styles.formControl} ${errors.email ? `${isInvalid}`: ""}`}
                                        onChange={(e) => setemail(e.target.value)}></input>
                                    {errors.email && <small className={styles.invalidFeedback}>{errors.email}</small>}
                                </div>
                                <button className={styles.btnSuccess} onClick={saveOrUpdateEmployee}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployeeComponent
