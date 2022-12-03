import React, { useContext,useEffect } from 'react'
import { ItemContext } from './ItemContext'
import Add from '../images/icons/add.png'
import Remove from '../images/icons/remove.png'


export function ItemsShow(props) {

    

    const reducer = useContext(ItemContext)
    let Products = reducer.state.SpecialItemsList;
    if (props.Products === "SpecialItemsList") {
        Products = reducer.state.SpecialItemsList;
    }
    else if (props.Products === "Burgers") {
        Products = reducer.state.Burgers;
    }
    else if (props.Products === "Pizza") {
        Products = reducer.state.Pizza;
    }
    else if (props.Products === "Dessert") {
        Products = reducer.state.Dessert;
    }
    else if (props.Products === "Drinks") {
        Products = reducer.state.Drinks;
    }
    else if (props.Products === "Cart"){
        Products = reducer.state.cartItems;

    }
    const  addItems =(id,productType)=>{

        reducer.dispatch({type:"INCREMENT" ,payload : id, productType : productType})
        reducer.dispatch({type:"CART_UPDATE",productType : productType})
    
        
        
    }
    const  removeItems =(id,productType)=>{
        reducer.dispatch({type:"DECREMENT" ,payload : id, productType : productType})


        reducer.dispatch({type:"CART_UPDATE",productType : productType })
    }

  



      return (
          Products.map((item)=>{
            // 'http://127.0.0.1:8000/storage/images/' +
              return (
                  
                  <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-[230px] h-[340px]" key={item.id}>
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
                    <button onClick={()=>removeItems(item.id,props.Products)} className={item.amount===0?'hidden': 'block'}><img src={Remove} alt="" className='w-[20px]' /></button>
                    <div className={item.amount===0 ?'hidden': 'block'}><input type="text" placeholder={item.amount} readOnly className='w-5 outline-none text-center' /></div>
                    <button onClick={()=>addItems(item.id,props.Products)}><img src={Add} alt=""  className='w-[20px]'/></button>
                </div>
                <div><b>{item.price} TK</b></div>
            </div>
            </div>
        </div>
    </div>)
            })


        );
}
export default ItemsShow;
