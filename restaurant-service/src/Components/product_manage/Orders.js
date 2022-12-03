import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Orders() {
 const navigate = useNavigate();

  const [totalOrders, settotalOrders] = useState(false)


  useEffect(() => {
    let token = localStorage.getItem('token')
  axios.get('http://127.0.0.1:8000/api/orders',{headers: {'Accept' : 'application/json','Authorization' : 'Bearer '+token}}).then((e)=>{
    settotalOrders(e.data)
  
  })

}, [])

  return (
    <div className='w-[90%] border-2 border-black mx-auto rounded-lg'>

    <div className='text-2xl font-bold text-center '>Orders</div>
    <div className= 'flex flex-col gap-y-16 py-5 border-t-2 border-t-black'>
      
    {totalOrders? totalOrders.map((e)=>{

    return (
      <div className= 'flex flex-row mx-4 font-bold text-xl justify-between px-16' key = {e.id}> <div > {'Table No. '+e.Table_No}</div>
      <div className='w-fit px-2 py-1 rounded-lg  bg-blue-700 text-white cursor-pointer' onClick={()=> navigate('/product/order/'+e.id) }>View</div>
      </div>
    )
    }
      )
    : <div className='font-bold text-xl text-center'>'No Orders!'</div>}
    </div>

    </div>
  )
}

export default Orders