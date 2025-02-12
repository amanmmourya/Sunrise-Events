

export const Reducer = (state , action)=>{
  
        if(action.type==="GET_SERVICES")
        {
            return {
                ...state,
                services: action.payload
            }
        }
      
        
        
        

    return state ;
};
 