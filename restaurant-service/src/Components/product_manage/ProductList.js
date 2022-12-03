import React,{useEffect,useState,useContext} from 'react'
import { ItemContext } from '../ItemContext';



function ProductList(props) {
    const  AllItems = useContext(ItemContext);
    const [Items, setItems] = useState([]);
    console.log('hlw')
  return (
props.Select
  )
}

export default ProductList




// <div className='mt-4' key={item.sno}>
                
//                 <div className='mx-4 flex justify-between'>
//                   <div>
//                   <img src={item.url} alt="" className='w-32 sm:w-36 md:w-40 rounded-md' />
//                   </div>
//                   <div className='py-4 font-bold'>
//                     {item.name}
//                   </div>
//                   <div className='py-4'>{item.desc}</div>
//                   <div className='py-4'>{item.price} TK</div>
//                   <dir className='space-x-2 py-4 sm:py-8 md:py-11'>
//                      <button className='px-3 py-1 bg-red-600 rounded-md text-white'>Edit</button>
//                      <button className='px-3 py-1 bg-blue-600 rounded-md text-white '>Delete</button>
//                   </dir>
//                   </div>   
                  
//                <hr className='my-4 mx-2' />
//             </div>