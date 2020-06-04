import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { render } from 'react-dom';

function AddUser() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        axios
            .post('http://localhost:5000/users', data)
            .then(res => {console.log(res)})
            .catch(err => {console.log(err)})
            .finally(() => window.location.reload());
    };

    return(
        <>
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="name" name="name" ref={register({required: true, maxLength: 80})} />
            <input type="text" placeholder="bio" name="bio" ref={register({required: true, maxLength: 100})} />

            <input type="submit" /> 
        </form>
        </>

    )
}

export default AddUser;