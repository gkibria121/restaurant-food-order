import React,{useState,useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemContext'
function SignIn() {
    const getAuth = useContext(ItemContext);
    
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState(false)
  
    function getSingIn() {

    

      const fd = new FormData;
        fd.append('email', Email);
        fd.append('password', Password);
    
        axios.post('http://127.0.0.1:8000/api/login',fd,{headers: {
            "Accept" : 'application/json'
        }}).then((get_token)=>{

            if(get_token.data !== 'login faild'){
                localStorage.setItem('token',get_token.data.token)
                localStorage.setItem('role',get_token.data.role)
                getAuth.headerDispatch({type : 'LOGIN', payload : 'Auth'})
                if(get_token.data.role==='admin'){
                  getAuth.headerDispatch({type : 'LOGIN', payload : 'Admin'})
                }
       

                setError(false)
                navigate('/')
            }
            else{
                setError(true)
            }

        })
    }
       
  return (

<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-[535px] mx-auto">
    <div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input value={Password} onChange={(e)=>{setPassword(e.target.value)}} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
      <p className={error ? 'hidden' : "text-red text-xs italic"}>Please choose a password.</p>
      <p className={error ? 'text-red-500': 'hidden'}>log in error . Please try agian</p>
    </div>
    <div className="flex items-center justify-between">
      <button  onClick={getSingIn} className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
        Forgot Password?
      </a>
    </div>
</div>
  )
}

export default SignIn