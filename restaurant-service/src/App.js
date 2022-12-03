import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
import ItemsShow from './Components/Items';
import ItemsInTheCart from './Components/ItemsInTheCart';
import { ItemState } from './Components/ItemContext';
import CartBar from './Components/CartBar';
import CartSummary from './Components/Cartsummary';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Create from './Components/product_manage/Create'
import Edit from './Components/product_manage/Edit'
import Manage from './Components/product_manage/Products'
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Logout from './Components/Logout';
import Thank from './Components/Thank';
import ProtectedRoutes,{ProtectedRoutesForAdmin} from './Components/ProtectedRoutes';
import Orders from './Components/product_manage/Orders'
import Order from './Components/product_manage/Order'

function App() {

   const [Active, setActive] = useState('SpecialItems');
   


   return (
      <>
         <ItemState>

            <Header />
            <CartBar active={setActive} isActive={Active} />
            <Routes>
               <Route path='/home' element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='/login' element={<SignIn />} />
               <Route path='/register' element={<SignUp />} />


               <Route element={<ProtectedRoutes />}>

                  <Route path='/' element={
                     <div className='flex flex-row ' >
                        <div className='pt-[9rem]'><Sidebar active={setActive} /></div>
                        <div className={Active !== "Cart" && Active !== "Thanks" ? 'text-center mx-auto' : "hidden"}>
                           <div className='pt-[5rem] grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
                              {Active !== "Cart" && Active !== "Thanks" && <ItemsShow Products={Active} />}
                           </div>
                        </div>
                        <div className="flex flex-row px-10">
                           <div className='grid grid-flow-row md:grid-cols-2  lg:grid-cols-3 gap-10 py-10'>
                              {Active === "Cart" && <ItemsInTheCart />}
                           </div>
                           <div className={Active === "Cart" ? ' pl-10 py-10 w-96' : 'hidden'}>
                              {Active === "Cart" && <CartSummary setActive={setActive} />}
                           </div>
                        </div>
                     </div>
                  } />
               </Route>
               <Route path='/thank' element={<Thank />} />
                  <Route path='/logout' element={<Logout />} />
                 <Route element={<ProtectedRoutesForAdmin />}>
                  <Route path='/product/create' element={<Create />} />
                  <Route path='/product/edit/:id' element={<Edit />} />
                  <Route path='/product/manage' element={<Manage />} />
                  <Route path='/product/orders' element={<Orders />} />
                  <Route path='/product/order/:id' element={<Order  />} />
                 </Route>
            </Routes>
            <Footer />
         </ItemState>
      </>

   );
}

export default App;
