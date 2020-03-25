import React from "react";
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

    //managing state for our form inputs
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        terms: ''
    });
    //state for Errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        terms: ''
    });
    //state for Post request
    const [post, setPost] = useState([]);


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
    //validation
    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors, [e.target.name] : ''
                });
            })
            .catch(err => {
                setErrors({
                    ...errors, [e.target.name]: err.errors[0]
                });
            });
    };
    //form submit with post request
    const formSubmit = e => {
        e.preventDefault();
        axios 
            .post('https://reqres.in/api/users', formState)
            .then( res => {
                setPost(res.data);
                console.log("success", post);
                setFormState({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    terms: ''
                });
            })
            .catch(err => console.log(err.response))

    }



    return (
        <form>
            <label htmlFor="name">
                Name
                <input 
                    type='text'
                    name='name'
                    value={formState.name}
                    onChange={inputChange} 
                />
            </label>
            <label htmlFor="email">
                Email
                <input
                    type='text'
                    name='email'
                    value={formState.email}
                    onChange={inputChange} 
                />
            </label>
            <label htmlFor="password">
                Password
                <input 
                    type='text'
                    name='name'
                    value={formState.password}
                    onChange={inputChange} 
                />
            </label>
            <label htmlFor="role">
                Role
                <select id="roles" name="roles" onChange={inputChange}>
                    <option value="Front-End"> Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Project Manager">Project Manager</option>
                </select>
            </label>
            <label htmlFor="">

                <input 

                />
            </label>
            {/* <pre>{JSON.stringify(post, null, 3)}</pre> */}
            <button>Submits</button>
        </form>
    );
}