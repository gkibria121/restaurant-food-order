import axios from 'axios';
import React,{useContext,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemContext } from './ItemContext';

function CartSummary(props) {

  const CartContext = useContext(ItemContext);
  let finalItems = CartContext.state.cartItems;
  let totalAmount = CartContext.state.totalAmount;

  const [check, setCheck] = useState(false)
  const navigate = useNavigate();

  
  function submitOrder() {
    setCheck(!check ); 
    const token = localStorage.getItem('token')
   const fd = new FormData;
   const totalOrder = []
   finalItems.map((e)=>{
  let  pid = e.id
   let pamount = e.amount
   let pname = e.name
   let pprice = e.price
    totalOrder.push({'name' : pname,'id' : pid, 'amount' :pamount , 'price' : pprice})
   }) 

   let summery = { 'totalOrderItems' : totalOrder, 'total' : totalAmount}

   const order = JSON.stringify(summery);

    fd.append('order',order)

    axios.defaults.withCredentials = true;
const url = 'http://127.0.0.1:8000'
axios.get(url + '/sanctum/csrf-cookie').then((rsp) => {
  axios.post('http://127.0.0.1:8000/api/product',fd,{headers: {
      'Accept' : 'application/json',
      'Authorization' : 'Bearer '+token
    }} )
})
}
function cartClear() {
  console.log('clean')
  CartContext.dispatch("CLEAR")
  props.setActive('SpecialItems')
  CartContext.headerDispatch({ type : "LOAD" })
  navigate('/thank')
  
}

 return (
  
    <>
    <div className='text-2xl font-bold text-center'>Cart Summary</div>
    <div className= 'flex flex-col gap-y-5 py-4'>
    {finalItems.map((e)=>{
    return (
      <div className= 'flex flex-row' key = {e.id}><b>{e.price} TK <span >x </span>  {e.amount} {e.name+'  '}  = {e.amount*e.price} TK</b></div>
    )
    }
      )}
    </div>
    <div className="text-2xl font-bold ">Total : {totalAmount} TK </div>
    <div className="p-2 bg-blue-600 text-center text-white rounded-md my-4 cursor-pointer" onClick={()=>{submitOrder(); cartClear() }}>Check Out</div>
    </>
  )

}

export default CartSummary