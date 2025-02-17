import React, { createContext, useEffect } from "react";
import { useContext } from "react";
import { Reducer } from "./Reducer";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const url = "http://localhost:5000/services";
const initialState ={
    services:[],
      bookData: JSON.parse(localStorage.getItem("bookData")) || [],

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
    order:""
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const fetchOrder = async () => {
    console.log("fetch order called");
    const url = "http://localhost:5000/appointment/create-razorpay-order";
    const token = localStorage.getItem("token"); // Assuming authentication is required

    try {
      const lastBooking = state.bookData[state.bookData.length - 1];
      if (!lastBooking) {
        console.error("No booking data found");
        return;
      }
      

      const amount = lastBooking.price;
      if (amount <= 0) {
        console.error("Invalid amount for Razorpay order:", amount);
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount, // Assuming price is in the last booking
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      console.log("Order fetched:", data);

      dispatch({
        type: "SET_ORDER",
        payload: data, // Assuming `data` contains the order object
      });
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const fetchCurrentUser = async () => {
    const url = "http://localhost:5000/api/auth/user/me";
    const token = localStorage.getItem("token");
    console.log(token, "token is here") 
    // Assuming JWT is stored in localStorage
    if (!token) {

      console.log("token not found")
      localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" }); // Optional: Dispatch logout action
        navigate("/login"); // Redirect to login page
        return; // Exit the function after logging out
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token for authentication
        },
      });

      const data = await response.json();
      console.log(data.user, "user")

      // Handle token expiration
      if (response.status === 401 && data.message === "Token has expired") {
        console.log("Token expired, logging out...");
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" }); // Optional: Dispatch logout action
        navigate("/login"); // Redirect to login page
        return; // Exit the function after logging out
      }
      if (!response.ok) {
        console.log("response is not okay ", response.status)
        throw new Error("Failed to fetch current user info");
      }

      console.log("Data fetched:", data);
      dispatch({
        type: "SET_PROFILE_INFO",
        payload: data.user, // Assuming the backend sends user data in `user`
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };



  const setUserdata = (userEmail, userPassword) => {
    dispatch({
      type: "SET_DATA",
      payload: { userEmail, userPassword },
    });
  };


  const setSelectedButton = (button) => {
    dispatch({
      type: "SET_SELECTED_BUTTON",
      payload: button,
    });
  };


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

  useEffect(()=>{
    fetchCurrentUser();
  
  },[])
  useEffect(() => {
    if (state.services.length > 0 && state.bookData.length > 0) {
      console.log("Calling fetchOrder after data is ready");
      fetchOrder();
    }
  }, [state.services, state.bookData]);
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getServices,
        setbookingData,
        fetchOrder,
        setSelectedButton,
        fetchCurrentUser,
        setUserdata
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
