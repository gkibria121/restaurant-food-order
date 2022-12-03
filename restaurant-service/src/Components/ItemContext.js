import {createContext,useReducer,useState,useEffect} from 'react';
import {reducer} from './function/reducer';
import headerReducer from './function/headerReducer';
import axios from 'axios';
export const ItemContext = createContext();




export const ItemState =(props)=>{
  const initialState = {
    SpecialItemsList :[],
    Burgers : [],
    Pizza: [],
    Dessert : [],
    Drinks : [],
    cartItems: [],
    totalAmount : 0,
    totalItems: 0
  }
  const [state, dispatch] = useReducer(reducer, initialState);
const    initialHeaderState =
{  Auth : localStorage.getItem('token') ,
 Admin : localStorage.getItem('role')=='admin',
load : false
}

  const [headerState, headerDispatch] = useReducer(headerReducer,initialHeaderState )
 

useEffect(() => {
  const token = localStorage.getItem('token')
  if(token !==null){

     axios.get('http://127.0.0.1:8000/api/product',{
       headers: {'Accept' : 'application/json',
       'Authorization' : 'Bearer '+ token,
     },
     })
     .then((rsp)=>{

       dispatch({type: 'FETCH', payload: rsp.data})
     })
  }
}, [headerState])




    
    return(
        <ItemContext.Provider value={{state,dispatch,headerState, headerDispatch}}>
           {props.children}
        </ItemContext.Provider>
    )
}