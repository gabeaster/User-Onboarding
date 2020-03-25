import React from "react";
import axios from "axios";
import * as yup from "yup";



export default function Form() {

    // //managing state for our form inputs
    // const [formState, setFormState] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     role: '',
    //     terms: ''
    // });




    return (
        <form>
            <label htmlFor="name">
                Name
                <input 
                    type='text'
                    name='name'
                    value=''
                    onChange=''
                />
            </label>
            <label htmlFor="">

                <input 

                />
            </label>
            <label htmlFor="">

                <input 

                />
            </label>
            <label htmlFor="">

                <input 

                />
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