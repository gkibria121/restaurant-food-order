import {CartItems} from '../CartItems'

export const reducer = (state, action) => {
  
  // specify itemlist and totalItems
  let  Items = state.SpecialItemsList;
  let  totalItems = state.totalItems;

  let updatedCart;
  let   cartItems = state.cartItems;
  let totalAmount = state.totalAmount;



  // get targeted item list 
    let active =action.productType;

  if (action.type === 'INCREMENT' || action.type === 'DECREMENT'){    

    if (active === "SpecialItems" || action.productType===1 ) {
      Items = state.SpecialItemsList;

    }
    if (active === "Burgers" || action.productType===2) {
       Items = state.Burgers;
    }
    if (active === "Pizza" || action.productType===3) {
           Items = state.Pizza;
    }
    if (active === "Dessert" || action.productType===4) {
           Items = state.Dessert;
    }
    if (active === "Drinks" || action.productType===5) {
       Items = state.Drinks;
    }
 } 


//increment items amount

  if (action.type === 'INCREMENT') {
    
     updatedCart = Items.map((element) => {


      if (element.id === action.payload) {
        let amount = element.amount +1;
        totalItems = totalItems +1;
        totalAmount = totalAmount+ (element.price)
        return { ...element, amount: amount };
      }
      return element;
    })  

  }
//decrement item amount
 else if (action.type === 'DECREMENT')  {
    updatedCart = Items.map((element) => {
      if (element.id === action.payload) {
        let amount = element.amount;
        if (amount ===0 ){
          return element;
        }
        else {
          if(action.deselect){
            totalItems = totalItems - amount;
            totalAmount = totalAmount - (amount*element.price)
            amount = 0;

          }
          else {
            amount= amount - 1;
            totalItems = totalItems - 1;
            totalAmount = totalAmount - element.price
          }

          return { ...element, amount: amount };
        }
      }
      return element;
    })


  }
  // change item amount
 if (action.type === 'INCREMENT' || action.type === 'DECREMENT'){

   if (active === "SpecialItems" || action.productType===1) {
     return { ...state, SpecialItemsList: updatedCart, totalItems : totalItems,totalAmount : totalAmount};
  }
  else if (active === "Burgers"|| action.productType===2 ) {
    return { ...state, Burgers: updatedCart, totalItems : totalItems,totalAmount : totalAmount  };
  }
  else if (active === "Pizza"|| action.productType===3) {
    return { ...state, Pizza: updatedCart, totalItems : totalItems,totalAmount : totalAmount  };
  }
  else if (active === "Desert"|| action.productType===4) {
    return { ...state, Desert: updatedCart, totalItems : totalItems,totalAmount : totalAmount  };
  }
  else if (active === "Drinks"|| action.productType===5) {
    return { ...state, Drinks: updatedCart, totalItems : totalItems  };
  }
} 
if (action.type === "CART_UPDATE"){

  return {...state,cartItems: CartItems(state) };
}
if (action.type === "CART_INCREMENT"){
 
let newCartItems = cartItems.map((e)=>{
  if(e.id === action.payload){

    return {...e, amount : e.amount + 1}  
  }
  return e;
  })

  return {...state, cartItems : newCartItems,totalAmount : totalAmount};
}
if (action.type === "CART_DECREMENT"){
 
  let newCartItems = cartItems.map((e)=>{
    if(e.id === action.payload){
  
      return {...e, amount : e.amount - 1}  
    }
    return e;
    })
  
    return {...state, cartItems : newCartItems,totalAmount : totalAmount};
  }

  if(action.type==="CART_DELTE_ITEM"){
  let  newCartItems= cartItems.filter((e)=>{
      if(e.id === action.payload){
   
        return !e;
      }
      return e;

    })
  
   return {...state, cartItems : newCartItems};
}


//update initial

if(action.type ==="FETCH"){

 let SP = action.payload[0].items;
 let Burgers = action.payload[1].items;
 let Pizza= action.payload[2].items;
 let Dessert= action.payload[3].items;
 let Drinks= action.payload[4].items;



  return {...state,SpecialItemsList: SP, Burgers : Burgers, Pizza : Pizza ,Dessert :Dessert ,Drinks :Drinks };
}

if("CLEAR"){

  return {...state, cartItems : [],totalAmount: 0,totalItems: 0}
}
return state;

}

