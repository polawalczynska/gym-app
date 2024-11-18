import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

function Home({ }: Props) {
    const navigate = useNavigate();

    return (
        <div className='home'>
            <h1>Helloooooooooo</h1>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}

export default Home