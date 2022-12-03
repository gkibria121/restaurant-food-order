import axios from 'axios';
import React, { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemContext } from './ItemContext'
function Logout() {
    const getAuth = useContext(ItemContext);
    const navigate = useNavigate();
    useEffect(() => {
         const token = localStorage.getItem('token');
        getAuth.headerDispatch({type : 'LOGOUT'})
        console.log('loggin out')
        axios.get('http://127.0.0.1:8000/api/logout',{
            headers: {'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
          }
    }).then((rp)=>{
        console.log(rp.data)
    })
        localStorage.clear();
        navigate('/login')
    }, [])

    return (
        <div>log out</div>

    )
}

export default Logout