import React, { useContext } from 'react'
import Add from "../images/icons/add.png"
import Remove from "../images/icons/remove.png"
import { ItemContext } from './ItemContext'


function ItemsInTheCart(props) {
  let CartContext = useContext(ItemContext);
  let ItemsInCart = CartContext.state.cartItems;

  const addItems =(id,name)=>{
    CartContext.dispatch({type: "CART_INCREMENT",payload: id,name})
    CartContext.dispatch({type: "INCREMENT",payload: id,productType: name})



  }
  const removeItems =(id,name)=>{
    CartContext.dispatch({type: "CART_DECREMENT",payload: id,productType: name})
    CartContext.dispatch({type: "DECREMENT",payload: id,productType: name})
  }
  const DeleteItem =(id,name)=>{
    CartContext.dispatch({type: "CART_DELTE_ITEM",payload: id, productType: name})
    CartContext.dispatch({type: "DECREMENT",payload: id,productType: name,deselect : true})

  }

  return (
    ItemsInCart.map((item)=>{
      return (
         
        <div className= "max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-[230px] h-[350px]" key={item.id}>
        <div href="#">
            <img className="rounded-t-lg h-[200px] w-full" src={ item.url} alt=""/>
        </div>
        <div className="p-5 flex flex-col justify-end">
            <div href="#">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
            </div>
            <div className=''>
            <div className='flex justify-between'>
                <div className='flex flex-row space-x-2'>
                    <button onClick={()=>removeItems(item.id,item.category_id)} className={item.amount===0?'hidden': 'block'}><img src={Remove} alt="" className='w-[20px]' /></button>
                    <div className={item.amount===0 ?'hidden': 'block'}><input type="text" placeholder={item.amount} readOnly className='w-5 outline-none text-center' /></div>
                    <button onClick={()=>addItems(item.id,item.category_id)}><img src={Add} alt=""  className='w-[20px]'/></button>
                </div>
                <div><b>{item.amount*item.price} TK</b></div>
            </div>
                    <button className='p-1 my-1 rounded-md bg-red-600 text-white'onClick={()=>DeleteItem(item.id,item.category_id)}> Delelet</button>
            </div>
        </div>
    </div>
        

)
})
  )
}

export default ItemsInTheCart