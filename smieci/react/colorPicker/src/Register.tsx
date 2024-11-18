import React, { useState } from 'react'
import axios from 'axios';

type Props = {}

function Register({ }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                email,
                password
            });

            if (response.status === 200) {
                alert('User registered successfully');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Registration failed: ', error);
            alert('Registration failed');
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input type='email' onChange={handleEmailChange} required />
                <label>Password</label>
                <input type='password' onChange={handlePasswordChange} required />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register