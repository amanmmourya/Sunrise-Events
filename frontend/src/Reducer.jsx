

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
          if(action.type== "SET_ORDER"){
            return{
                ...state,
                order : action.payload,
            }
        }  
        if(action.type==="SET_SELECTED_BUTTON"){
          return{
              ...state,
              selectedButton :action.payload,
          };
        };
        if(action.type =="SET_PROFILE_INFO"){
          console.log(action.payload,"profileInfo")

          return{
              ...state,
              profileInfo:action.payload,
          };
      }
      if(action.type=="LOGOUT"){
        return {
            ...state,
            profileInfo:null,
           
    }
   } if(action.type==="SET_DATA")
      {
          return{
              ...state,
              userEmail :action.payload.userEmail,
              userPassword:action.payload.userPassword
      }
      }
      if (action.type === "LOGOUT") {
        return {
          ...state,
          profileInfo: {}, // ✅ Set to an empty object instead of ""
        };
      }
      
      
        
        
        

    return state ;
};
 