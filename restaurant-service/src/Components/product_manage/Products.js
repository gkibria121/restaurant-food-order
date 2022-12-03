import axios from 'axios';
import React,{useState,useEffect,useContext} from 'react'

import { useNavigate } from 'react-router-dom';
import { ItemContext } from '../ItemContext';





function Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
   const reducer = useContext(ItemContext);
   const [fetch, setFetch] = useState(0)
   const [Selects, setSelects] = useState('<-- Select Option -->');
const [Items, setItems] = useState(reducer.state.SpecialItemsList)
  const token = localStorage.getItem('token')
   function getDeleted(id){
    // console.log(document.getElementById(id))
    document.getElementById(id).classList.add('hidden')
       axios.delete('http://127.0.0.1:8000/api/item/'+ id,{headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' +token}}).then((msg)=>{
        console.log(msg)
        reducer.headerDispatch({type : "LOAD"})
      });
      setFetch(fetch+1)
    //    axios.get('http://127.0.0.1:8000/api/product',{headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' +token}})
    //    .then((rsp)=>{
    //      reducer.dispatch({type: 'FETCH',from : 'delete', payload: rsp.data})
    //      setFetch(fetch+1)            
    //  })
   }

   
   function getEdit(id){
   let path = '/product/edit/'+ id;
    navigate(path);
    // axios.delete('http://127.0.0.1:8000/item/'+ id).then((rsp)=>{console.log(rsp)});

}
function getSearch(key){
setSelects('search')
if(key!==''){

  setFetch(fetch+1)
  const url = 'http://127.0.0.1:8000'

  
    axios.get( url + '/api/item/search/'+key,{headers: {'Accept' : 'application/json', 'Authorization' : 'Bearer ' +token}})
    .then((rsp)=>{setItems(rsp.data)})
  

  }
}



   
  return (
    <>
    <div>
      <div className='flex justify-between mx-4 py-4'>
        <div className='font-bold py-2'>Product List</div>
        <div>
        <select value={Selects} onChange={(e)=>{setSelects(e.target.value)}} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 mt-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option className='text-center'>{'<-- Select Option -->'}</option>
            <option className='text-center'>Burgers</option>
            <option className='text-center'>Special Items</option>
            <option className='text-center'>Pizza</option>
            <option className='text-center'>Dessert</option>
            <option className='text-center'>Drinks</option>
         </select>
        </div>
        <div className='hidden sm:block'>
          
         {/* <input type="text" placeholder='Search Product' value={search} onChange={(e)=>{setSearch(e.target.value)}} className='p-2 outline-slate-500 mx-4 bg-slate-500 w-32 sm:w-40 md:w-52 rounded-md placeholder-white text-white '  />
         <button className='py-2 px-4 bg-blue-700 rounded-md text-white' onClick={()=>{getSearch(search)}}>Search</button> */}
        
        <div className="relative w-full">
            <input type="search" id="search-dropdown" value={search} onChange={(e)=>{setSearch(e.target.value)}} className="block p-2.5 w-72 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-2 focus:ring-blue-300  focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 outline-none" placeholder="Search..." required />
            <button type="submit" onClick={()=>{getSearch(search)}} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
        </div>
      </div>


      {
        useEffect(() => {
          if (Selects === "Special Items"){

            setItems(reducer.state.SpecialItemsList);
            
          }
          else if (Selects ==='Burgers'){
            
            
            setItems(reducer.state.Burgers);
          }
          else if (Selects ==='Pizza'){
            
            setItems(reducer.state.Pizza);
         }
         else if (Selects ==='Dessert'){
           
          setItems(reducer.state.Dessert);
         }
         else if (Selects ==='Drinks'){
           setItems(reducer.state.Drinks);
           
          }
          

          
        }, [Selects,fetch])
        
        
      }
      {
      Items ===[] ? "" :
        Items.map((item)=>{

          return (
 
          <div className='mt-4' key={item.id} id = {item.id}>
                
                <div className='mx-4 flex justify-between'>
                  <div>
                  <img src={item.url} alt="" className='w-32 sm:w-36 md:w-40 rounded-md' />
                  </div>
                  <div className='py-4 font-bold'>
                    {item.name}
                  </div>
                  <div className='py-4'>{item.desc}</div>
                  <div className='py-4'>{item.price} TK</div>
                  <dir className='space-x-2 py-4 sm:py-8 md:py-11'>
                     <button className='px-3 py-1 bg-red-600 rounded-md text-white' onClick={()=>{getEdit(item.id)}} >Edit</button>
                     <button className='px-3 py-1 bg-blue-600 rounded-md text-white ' onClick={()=>{getDeleted(item.id)}}>Delete</button>
                  </dir>
                  </div>   
                  
               <hr className='my-4 mx-2' />
            </div>
    
            )
        }) 
      }

    </div>
    </>
  )
}

export default Products