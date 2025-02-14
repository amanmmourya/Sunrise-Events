import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { Reducer } from "./Reducer";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const url = "http://localhost:5000/services";

const initialState ={
    services:[],
    bookData:[],
    dailyRevenue: [],
    weeklyRevenue: [],
    monthlyRevenue: [],
  
    dailyAppointments: [],
    weeklyAppointments: [],
    monthlyAppointments: [],
  
    dailyNewCustomers: [],
    weeklyNewCustomers: [],
    monthlyNewCustomers: [],
  
    profileInfo: null, // Updated to hold user profile info
  
    selectedButton: "button1",
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

  // const fetchCurrentUser = async () => {
  //   const url = "https://salonease-oy0f.onrender.com/auth/users/me";
  //   const token = localStorage.getItem("authtoken"); // Assuming JWT is stored in localStorage
  //   if (!token) {
  //     localStorage.removeItem("authtoken");
  //       dispatch({ type: "LOGOUT" }); // Optional: Dispatch logout action
  //       navigate("/login"); // Redirect to login page
  //       return; // Exit the function after logging out
  //   }
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Pass the token for authentication
  //       },
  //     });

  //     const data = await response.json();

  //     // Handle token expiration
  //     if (response.status === 401 && data.message === "Token has expired") {
  //       console.log("Token expired, logging out...");
  //       localStorage.removeItem("authtoken");
  //       dispatch({ type: "LOGOUT" }); // Optional: Dispatch logout action
  //       navigate("/login"); // Redirect to login page
  //       return; // Exit the function after logging out
  //     }
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch current user info");
  //     }

  //     console.log("Data fetched:", data);
  //     dispatch({
  //       type: "SET_PROFILE_INFO",
  //       payload: data.user, // Assuming the backend sends user data in `user`
  //     });
  //   } catch (error) {
  //     console.error("Error fetching current user:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchCurrentUser();
  // }, []);

  useEffect(() => {
    getServices(url);
  }, []);
  
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getServices,
        setbookingData,
        // fetchCurrentUser

        
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
