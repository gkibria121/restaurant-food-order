const headerReducer = (state, action)=>{
    if (action.type ==="LOGIN"){

        if (action.payload == 'Auth')
        {
            return {...state , Auth : true}
            
        }if (action.payload == 'Admin')
        {
            return {...state , Admin : true}
            
        }
    }
    if (action.type ==="LOGOUT"){
           return {Auth : false, Admin : false}
    }
    if(action.type ==="LOAD"){

return {...state, Load : !state.load}
}


return state;
}
export default headerReducer;