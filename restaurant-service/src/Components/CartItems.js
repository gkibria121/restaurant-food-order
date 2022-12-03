
export const CartItems = (state)=>{
    const ContextItems = state;
    let allItems = [];
    let newCartItems = [];
    const SPitems = ContextItems.SpecialItemsList;
    const Burgers = ContextItems.Burgers;
    const Pizza  = ContextItems.Pizza;
    const Desert = ContextItems.Dessert;
    const Drinks = ContextItems.Drinks;
   
 
    allItems = allItems.concat(SPitems,Burgers,Pizza,Desert,Drinks);
    newCartItems = allItems.filter((e)=>{
        if(e.amount > 0){
            return e;
        }
        else {
            return false
        }
    })
    return newCartItems;
}