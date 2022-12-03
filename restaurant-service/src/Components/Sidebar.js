import React from 'react'
import Pizza from '../images/icons/pizza.png'
import burger from '../images/icons/burger.png'
import SI from '../images/icons/special.png'
import Dessert from '../images/icons/dessert.png'
import Drinks from '../images/icons/drinks.png'

import { useState } from 'react'
export default function Sidebar(props) {
    const [foodNames, setfoodNames] = useState(true)
    const handleFoodNames=()=>{setfoodNames(!foodNames)}

  return (
   <>
   <div className={foodNames? 'bg-gray-800 w-[170px]  rounded-r-md flex flex-row' : 'bg-gray-800 w-[55px]  rounded-r-md flex flex-row'} >
    <ul className='food-icons flex flex-col space-y-3 items-center text-white py-3'>
    <li onClick={()=>props.active('SpecialItems')}><img src={SI} alt="" className='w-[26px] cursor-pointer'/></li>
    <li onClick={()=>props.active('Burgers')}><img src={burger} alt="" className='w-[26px] cursor-pointer' /></li>
    <li onClick={()=>props.active('Pizza')}><img src={Pizza} alt="" className='w-[26px] cursor-pointer' /></li>
    <li onClick={()=>props.active('Dessert')}><img src={Dessert} alt="" className='w-[26px] cursor-pointer' /></li>
    <li onClick={()=>props.active('Drinks')}><img src={Drinks} alt="" className='w-[26px] cursor-pointer' /></li>

    </ul>
   <ul className= {foodNames? 'md:flex flex-col space-y-[0.85rem] mx-2 text-white py-4 ' : 'hidden'}   >
    <li className='cursor-pointer' onClick={()=>props.active('SpecialItems')}>Special Items</li>
    <li className='cursor-pointer' onClick={()=>props.active('Burgers')}>Burgers</li>
    <li className='cursor-pointer' onClick={()=>props.active('Pizza')}>Pizza</li>
    <li className='cursor-pointer' onClick={()=>props.active('Dessert')}>Dessert</li>
    <li className='cursor-pointer' onClick={()=>props.active('Drinks')}>Drinks</li>
   </ul>
  

    <ul onClick={handleFoodNames} className='pt-[82px] pl-2 ' >
      <li className= {foodNames?'text-white cursor-pointer w-5 bg-slate-900 p-1 rounded-md text-xl':'text-xl text-white cursor-pointer w-5 bg-slate-900 p-1 rounded-r-md translate-x-5'  } >{foodNames? '<' : '>'}</li>
    </ul>

   </div>
   </>
  )
}
