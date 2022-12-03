import React,{useContext} from 'react'
import cartImg from '../images/icons/shopping-cart.png'
import { ItemContext } from './ItemContext'
import leftArrow from '../images/icons/left-arrow.png'
import { useLocation,useNavigate } from 'react-router-dom'

function CartBar(props) {
  const location = useLocation();
  const ContextItems = useContext(ItemContext);
  const navigate = useNavigate();


    return (
      <>
      <div  className='py-3 px-4 flex flex-row justify-end space-x-10' onClick={()=>{navigate('/')}} >  
        <div onClick={()=>{props.active('SpecialItems') ;console.log('hi') ;}}  className={props.isActive==='Cart' && location.pathname =='/'? 'flex flex-row bg-blue-600 text-white px-3 pt-2 pb-2 rounded-md cursor-pointer' : 'hidden'}> <div className='px-1 pt-[0.1rem]' ><img src={leftArrow} alt=""className='w-[20px]' /></div> Continue Shoping</div>
   
        <div className='flex flex-row '><img className='w-[40px] cursor-pointer' src={cartImg} alt="" onClick={()=>{props.active('Cart')}} /> <div className='-mt-2 text-xl w-7 h-7 rounded-full bg-yellow-400 text-white text-center'><div className=''>{ContextItems.state.totalItems}</div></div></div>
        
      </div>
  
  
      </>
    )
 

}

export default CartBar