import React,{useEffect, useState} from "react"
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios'
export default function Create(){
  const navigate= useNavigate();
  const [Selects, setSelects] = useState(0);
const {id}   = useParams();
const [name, setName] = useState(' ');
const [price, setPrice] = useState(' ');
const [desc, setDesc] = useState(' ');
const [img, setImg] = useState(0);
const [imageError, setImageError] = useState('')
const [priceError, setPriceError] = useState('')
const [nameError, setNameError] = useState('')
const [descError, setDescEror] = useState('')
const [fetch, setfetch] = useState({name: '',price : '', category_id :'1', desc :''})
const handlefile = event =>{
  setImg(event.target.files[0])
}

function submit  (e){
  e.preventDefault();
  const token = localStorage.getItem('token')
 

  const fd = new FormData();
  fd.append('name',name)
  fd.append('image',img)
  fd.append('desc',desc)
  fd.append('price',price)
  fd.append('category_id',Selects)
  fd.append('_method','PUT')

axios.defaults.withCredentials = true;
const url = 'http://127.0.0.1:8000'
axios.get(url + '/sanctum/csrf-cookie').then((rsp) => {

  axios.post( url + '/api/item/'+id,fd,{
    headers : {
  'Accept' : 'application/json',
  
'Content-Type' : 'multipart/form-data',
  'Authorization' : 'Bearer '+ token
  }
  })
  .then(()=>{
    navigate('/')
  }
  )
  .catch((error)=>
  {
    const errors = error.response.data.errors
    setImageError(errors.image)
    setPriceError(errors.price)
    setNameError(errors.name)
    setDescEror(errors.desc)


  })

});  
  
}
useEffect(() => {
  const token = localStorage.getItem('token')
  axios.get('http://127.0.0.1:8000/api/item/'+id,{headers: {'Accept' : 'application/json' , 'Authorization' : 'Bearer '+token}}).then((e)=>{
    setfetch(e.data)
    setSelects(e.data.category_id)

    setName(e.data.name)
    setPrice(e.data.price)
    setDesc(e.data.desc)
  }) 

}, [])




   return (
   <>

<div className="">
<div className="w-full">
  <form onSubmit= {(e)=>{submit(e)}} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="http://127.0.0.1:8000/item">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Name
      </label>
      <input value={name==' '? fetch.name : name}  onChange={(e)=>{setName(e.target.value)}} name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Product Name" />
       <p className="text-sm text-red-500 px-2 pt-1">{nameError !== undefined ? nameError[0] : '' }</p>
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Price
      </label>
      <input value={price==' '? fetch.price : price} onChange={(e)=>{setPrice(e.target.value)}} name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Product Price" />
      <p className="text-sm text-red-500 px-2 pt-1">{priceError !== undefined ? priceError[0] : '' }</p>
    </div>
    <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          description
        </label>
        <input value={desc==' '? fetch.desc : desc}  onChange={(e)=>{setDesc(e.target.value)}}  name="desc" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:mt-0" id="username" type="text" placeholder="Enter Product Description" />
        <p className="text-sm text-red-500 px-2 pt-1">{descError !== undefined ? descError[0] : '' }</p>
      </div>
    <div className="w-64 mb-6">
      <label htmlFor="" className="mb-2 text-gray-700 text-sm font-bold ">Select Category</label>
 <input type="hidden" id="category" name="category_id" value={Selects} />
  <select id="categoryOptions" className="mx-2" value={Selects==0? 1 : 2} onChange={(e)=>{setSelects(e.target.value)}}>
    <option value="1">Special Items</option>
    <option value="2">Burgers</option>
    <option value="3">Pizza</option>
    <option value="4">Dessert</option>
    <option value="5">Drinks</option>
  </select>
 
</div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Image
      </label>
   
      <input onChange={handlefile} name="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="file" />
      <p className="text-sm text-red-500 px-2 pt-1">{imageError !== undefined ?imageError[0] : '' }</p>
    </div>
    <div className="flex items-center justify-between">
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>

    </div>
  </form>

</div>
</div>



   </>
      )

}