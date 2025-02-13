

export const Reducer = (state , action)=>{
  
        if(action.type==="GET_SERVICES")
        {
            return {
                ...state,
                services: action.payload
            }
        }
        if (action.type === "SET_BOOK_DATA") {
            console.log("Setting booking data...");
            console.log("Current State:", state);
            console.log("Action Payload:", action.payload);
        
            const updatedBookData = Array.isArray(action.payload)
              ? action.payload // If payload is an array, use it directly
              : [...(state.bookData || []), action.payload]; // Append a single booking
        
            const updatedState = {
              ...state,
              bookData: updatedBookData,
            };
        
            console.log("Updated State:", updatedState);
            return updatedState;
          }
      
        
        
        

    return state ;
};
 