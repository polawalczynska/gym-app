import React, { useState } from 'react'

type Props = {}

function Register({ }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert('register success');
            window.location.href = '/login';
        } else {
            console.log(response);
            alert('register failed');
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