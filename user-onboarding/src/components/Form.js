import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Everyone has a name, my friend"),
    email: yup
        .string()
        .email("Something's not right, my friend.")
        .required("Gotta have your email, my friend."),
    password: yup
        .string()
        .required("Any password will do, my friend."),
    role: yup
        .string(),
    terms: yup  
        .boolean().oneOf([true], "Agree to the Terms or Turn Away Now")

});

export default function Form() {
     //state for button
    const [buttonDisabled, setButtonDisabled] = useState(true);
    //managing state for our form inputs
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });
    //state for Errors
    const [errors, setErrors] = useState({
         name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    });
    //state for returning data in step 4
    const [users, setUsers] = useState([]);


   
    
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

 

    //form submit with post request
    const formSubmit = e => {
        e.preventDefault();
        axios 
            .post('https://reqres.in/api/users', formState)
            .then( res => {
                setUsers(res.data);
                console.log("success", users);
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                    terms: ""
                });
            })
            .catch(err => console.log(err.response))
    };

    const validateChange = e => {
         yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
            .then(valid => {
                setErrors({
                    ...errors, [e.target.name] : ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors, 
                    [e.target.name]: err.errors[0]
                });
            });
    };

 //input Change
    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name] : e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input 
                    type='text'
                    name='name'
                    value={formState.name}
                    onChange={inputChange} 
                />
                {errors.name.length > 1 ? (<p className="error"> {errors.name}</p>) : null }
            </label>
            
            <label htmlFor="email">
                Email
                <input
                    type='text'
                    name='email'
                    value={formState.email}
                    onChange={inputChange} 
                />
                {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
            </label>
            <label htmlFor="password">
                Password
                <input 
                    type='text'
                    name='password'
                    value={formState.password}
                    onChange={inputChange} 
                />
                {errors.password.length > 0 ? (<p className="error">{errors.password}</p> ) : null}
            </label>
            <label htmlFor="role">
                Role
                <select id="role" name="role" onChange={inputChange}>
                    <option value="Front-End"> Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Project Manager">Project Manager</option>
                </select>
            </label>
            <label htmlFor="terms" className="terms">
                <input 
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                Agree to the Terms
            </label>
            <div className='btn-container'>
                <button disabled={buttonDisabled}>Submit</button>
            </div>
            
            <pre>{JSON.stringify(users, null, 3)}</pre>
        </form>
    );
}