import axios from 'axios'
import React,{ useState} from 'react'
import {useNavigate } from 'react-router-dom'

function SignUp() {
const navigate = useNavigate();
const [Name, setName] = useState('')
const [Email, setEmail] = useState('')
const [Password, setPassword] = useState('')
const [CPassword, setCPassword] = useState('')
const [emailError, setemailError] = useState('')
const [nameError, setnameError] = useState('')
const [passwordError, setpasswordError] = useState('')
const [CpasswordError, setCpasswordError] = useState(undefined)
function SignUp(){
   const fd = new FormData()
   fd.append('name',Name)
   fd.append('email',Email)
   fd.append('password',Password)
   fd.append('cpassword',CPassword)

    axios.post('http://127.0.0.1:8000/api/register',fd,{headers: {
        "Accept" : 'application/json'
    }}).then((rsp)=>{

      if (rsp.data.message){
        setCpasswordError(rsp.data.message)
 
      }
      else{
          axios.post('http://127.0.0.1:8000/api/login',fd,{headers: {
          "Accept" : 'application/json'
      }})
          navigate('/login')
        }
    }).catch(error => {

      const errorMessage = error.response.data.errors;
      setEmail(errorMessage.email)
      setpasswordError(errorMessage.password)
      setnameError(errorMessage.name)

      
   })
  }
 

  return (
<>
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-[535px] mx-auto">
<div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
        Name
      </label>
      <input value={Name} onChange={(e)=>{setName(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Enter Your Full Name" />
      <p className="text-red text-xs italic text-red-500 py-1">{nameError!==undefined ? nameError[0] : '' }</p>
    </div>
    <div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="Enter Your Email Address" />
      <p className="text-red text-xs italic text-red-500 py-1">{emailError!==undefined ? emailError[0] : '' }</p>
    </div>
    <div className="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input  value={Password} onChange={(e)=>{setPassword(e.target.value)}} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
      <p className={passwordError!==undefined ? 'hidden' : '"text-red text-xs italic"' }>Please Choose a password.</p>
      <p className="text-red text-xs italic text-red-500 py-1">{passwordError!==undefined ? passwordError[0] : '' }</p>
    </div>
    <div className="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
        Confirm Password
      </label>
      <input  value={CPassword} onChange={(e)=>{setCPassword(e.target.value)}} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="cpassword" type="password" placeholder="******************" />
      <p className={CpasswordError!==undefined ? 'hidden' : '"text-red text-xs italic"' }>Please re-enter the password.</p>
      <p className="text-red text-xs italic text-red-500 py-1">{CpasswordError!==undefined ? CpasswordError : '' }</p>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button" onClick={SignUp}>
        Sign Up
      </button>
 
    </div>
</div>
</>
  )
}

export default SignUp