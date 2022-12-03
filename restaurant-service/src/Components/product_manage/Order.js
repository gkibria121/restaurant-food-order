import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function Order() {
    const [orders , setOrder] = useState(false);
    const [orderdItems, setorderdItems] = useState('')
    const [total, settotal] = useState(0)

    const {id} =useParams();
    useEffect(() => {
        const token = localStorage.getItem('token')
      

    axios.get('http://127.0.0.1:8000/api/order/'+id, { headers: {'Accept' : 'application/json' , 'Authorization' : "Bearer "+ token}})
    .then((e)=>{
      
        setOrder(e.data)
   
        let items = JSON.parse(e.data.Orders)
  
   settotal(items.total)
        setorderdItems(items.totalOrderItems)
        
        
    })
      
    }, [])
    

  return (
    <div>
       <div className='font-bold text-center text-xl py-4 px-10'>Summary</div>
  <div className=' px-6 pb-2' ><hr /></div>
           <div className='grid grid-flow-row px-10 mx-auto'>
                    <div className='grid grid-flow-col grid-col-4 font-bold '>
                        <div className='w-40'>Food Name</div>
                        <div className='w-40'>Amount </div>
                        <div className='w-40'>Price</div>
                        <div className='w-40'>Item Cost</div>
                    </div>
      {orders? orderdItems.map((e)=>{
        return (
            <div key={e.id} className='grid grid-flow-col grid-col-3 py-2'> 
            <div className='w-40'>{e.name} </div>
            <div className='w-40'>{e.amount}</div>
            <div className='w-40'> {e.price} TK </div>
            <div className='w-40 font-bold'> {e.price * e.amount + '  '}TK </div>
            </div>
        )
    }) : ''}
     <div className=' px-6 py-4 ' ><hr /></div>
<div className='font-bold text-xl text-center py-1'> Total   : {total} TK</div>
    </div>
    </div>
  )
}

export default Order