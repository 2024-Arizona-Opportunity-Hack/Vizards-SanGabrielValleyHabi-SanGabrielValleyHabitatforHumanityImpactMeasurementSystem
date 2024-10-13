
import React from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigator = useNavigate();
    const { setToken } = useAuth();

    useEffect(() => {
        setToken(null);
        navigator('/auth/sign-in');
    }, []);



    return (
        <div>index</div>
    )
}

export default Logout