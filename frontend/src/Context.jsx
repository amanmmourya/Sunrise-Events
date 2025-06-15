import React, { createContext, useEffect, useReducer, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Reducer } from "./Reducer";

const AppContext = createContext();

const url = "https://sunrise-events-wty9.onrender.com/services";
const initialState = {
  services: [],
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

  profileInfo: null, // Holds user profile info

  selectedButton: "button1",
  order: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const fetchOrder = async () => {
    console.log("fetch order called");
    const token = localStorage.getItem("token");

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

      const response = await fetch("https://sunrise-events-wty9.onrender.com/appointment/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) throw new Error("Failed to fetch order details");

      const data = await response.json();
      console.log("Order fetched:", data);

      dispatch({ type: "SET_ORDER", payload: data });
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found, logging out...");
      dispatch({ type: "LOGOUT" });
      return;
    }
  
    try {
      const response = await fetch("https://sunrise-events-wty9.onrender.com/api/auth/user/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = await response.json();
      console.log("User data received:", data); // ✅ Debug log
  
      if (!response.ok) throw new Error("Failed to fetch current user info");
  
      dispatch({ type: "SET_PROFILE_INFO", payload: data.user });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  

  const setUserdata = (userEmail, userPassword) => {
    dispatch({ type: "SET_DATA", payload: { userEmail, userPassword } });
  };

  const setSelectedButton = (button) => {
    dispatch({ type: "SET_SELECTED_BUTTON", payload: button });
  };

  const getServices = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      const services = data.data;
      console.log("from aman mourya",data);
      console.log("Fetched services:", services);
      dispatch({ type: "GET_SERVICES", payload: services });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const setBookingData = (name, email, phone, venue, guests, specialRequests, date, eventType, price) => {
    console.log("Setting booking data...");
    const newBooking = { name, email, phone, venue, guests, specialRequests, date, eventType, price };
    const updatedBookData = [...state.bookData, newBooking];

    dispatch({ type: "SET_BOOK_DATA", payload: updatedBookData });
    localStorage.setItem("bookData", JSON.stringify(updatedBookData));
    console.log("Booking data saved:", updatedBookData);
  };

  const setProfileInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found, logging out...");
      localStorage.removeItem("token"); // ✅ Clear token from storage
      dispatch({ type: "LOGOUT", payload: {} }); // ✅ Use an empty object, not ""
    }
  };
  

  useEffect(() => {
    if (!state.profileInfo) {
      fetchCurrentUser();
    }
  }, [state.profileInfo]); 
  useEffect(()=>{
    getServices();
  },[]);
  

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
        setBookingData,
        fetchOrder,
        setSelectedButton,
        fetchCurrentUser,
        setUserdata,
        setProfileInfo
      }}

    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for global context
const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };
