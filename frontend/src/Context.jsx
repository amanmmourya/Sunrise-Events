import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { Reducer } from "./Reducer";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const url = "http://localhost:5000/services";

const initialState ={
    services:[],
    bookData:[]
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  


  const getServices = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
    //   const services = await data.json();
    const services = data.data;
      console.log(services)
      console.log(data, "data"); // Log the fetched data
      dispatch({ type: "GET_SERVICES", payload: services }); // Dispatch action
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const setbookingData = (
  name,
  email, 
   phone,
  venue,
  guests,
  specialRequests,
  date,
  eventType,
  price
  ) => {
    console.log("Setting booking data...");
    const newBooking = {
      name,
  email, 
   phone,
  venue,
  guests,
  specialRequests,
  date,
  eventType,
  price
    };
    const updatedBookData = [...state.bookData, newBooking];

    // Save to state
    dispatch({
      type: "SET_BOOK_DATA",
      payload: updatedBookData,
    });

    // Persist to localStorage
    localStorage.setItem("bookData", JSON.stringify(updatedBookData));
    console.log("Booking data saved:", updatedBookData);
  

  }

  
  useEffect(() => {
    getServices(url);
  }, []);
  
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getServices,
        setbookingData

        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//global custom hooks

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext  };
