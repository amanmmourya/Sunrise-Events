import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalStyle } from "../GlobalStyle";
import Calendar from "./Calender";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { toast } from "react-toastify";


const Appointment = () => {
  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    date: null,
    time: "",
    venue: "",
    guests: "",
    eventType: "wedding",
    specialRequests: "",
  });
  const { setbookingData, order, bookData } = useGlobalContext()
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);


  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const service = location.state?.service || {};
  const [appointmentData, setAppointmentData] = useState({
    eventType: service.name || "", // Pre-fill event type with service name
    price: service.price || "", // Pre-fill price
    customerName: "",
    phone: "",
  });
  const price = appointmentData.price;
  const latestBooking = bookData?.length > 0 ? bookData[bookData.length - 1] : null;
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(order, "order fetched ");
  console.log("price", price);

  const handleChange = (e) => {
    setAppointmentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   script.onload = () => console.log("Razorpay script loaded.");
  //   document.body.appendChild(script);
  // }, []);


  const API = "http://localhost:5000/appointment/book-slots"


  const sendemail = async () => {



  }
  const bookSlots = async () => {

    console.log("in the try book slots function ")
    if (!formData.name
      || !formData.email ||
      !formData.phone ||
      !formData.venue ||
      !formData.guests ||
      !formData.specialRequests ||
      !formData.date ||
      !appointmentData.eventType ||
      !appointmentData.price

    ) {

      alert("Please fill all the details ");
      return;
    }



    const requestBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
      eventType: appointmentData.eventType,
      price: appointmentData.price

    };
    try {
      console.log("Sending request with:", requestBody);

      const response = await axios.post(API, requestBody, {
        headers: {
          "content-Type": "application/json",
        },
      });
      console.log("Response received:", response);
      if (response.status == 201) {
        // setbookingData(
        //   formData.name
        //   , formData.email,
        //   formData.phone,
        //   formData.venue,
        //   formData.guests,
        //   formData.specialRequests,
        //   formData.date,
        //   appointmentData.eventType,
        //   appointmentData.price,
        //   appointmentData.time
        // )
        console.log(response);

        setFormData({
          name: "",
          email: "",
          phone: "",
          date: null,
          time: "",
          venue: "",
          guests: "",
          eventType: "wedding",
          specialRequests: "",
        });

        setAppointmentData({
          eventType: service.name || "",
          price: service.price || "",
          customerName: "",
          phone: "",
        });
        console.log(
          "response fetched successssfully", response
        )
        // redirect to homepage
        navigate("/home")
        toast.success("Appointment booked successfully!");
      }
      else {
        alert("Failed to book appointment. Please try again.");
        console.log("else statement error that is response is not ok")
      }
    } catch (error) {
      console.log("some catch error has occured");
      toast.error("Booking failed. Please try again.");
      console.error("Booking failed:", error.response?.data || error.message);

    };
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await bookSlots();
      // await handlePayment();
    } catch (error) {
      console.error("booking error:", error);
      alert("booking failed. Please try again.");
    }

    setIsSubmitting(false);
  };


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/appointment/details");
        const data = await response.json();
        setAppointments(data);
        setFilteredAppointments(data);

      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);




  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FormStep>
            <StepIndicator>Step 1 of 3: Basic Information</StepIndicator>
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </InputGroup>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </InputGroup>
            <InputGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                required
                placeholder="Enter your contact number"
              />
            </InputGroup>
            <Button onClick={nextStep}>Next Step</Button>
          </FormStep>
        );
      case 2:
        return (
          <FormStep>
            <StepIndicator>Step 2 of 3: Event Details</StepIndicator>
            <InputGroup>
              <Label>Event Type</Label>
              <Select
                name="eventType"
                value={appointmentData.eventType} // Controlled value
                onChange={handleChange}
              >
                <option value="Wedding Decoration">Wedding Decoration</option>
                <option value="Reception Setup">Reception Setup</option>
                <option value="Sangeet Decoration">Sangeet Decoration</option>
                <option value="Haldi Decoration">Haldi Decoration</option>
                <option value="Rental Furniture">Rental Furniture</option>
                <option value="Sitting Arrangement">Sitting Arrangement</option>

              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Event Date</Label>
              <Calendar
                selectedDate={formData.date}
                onDateSelect={handleDateChange}
              />
            </InputGroup>
            <InputGroup>
              <Label>Preferred Time</Label>
              <Select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
              >
                <option value="">Select time</option>
                <option value="morning">Morning (8 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 8 PM)</option>
                <option value="night">Night (8 PM - 12 AM)</option>
              </Select>
            </InputGroup>
            <ButtonGroup>
              <Button onClick={prevStep} secondary>
                Previous
              </Button>
              <Button onClick={nextStep}>Next Step</Button>
            </ButtonGroup>
          </FormStep>
        );
      case 3:
        return (
          <FormStep>
            <StepIndicator>Step 3 of 3: Additional Details</StepIndicator>
            <InputGroup>
              <Label>Venue Location</Label>
              <Input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
                placeholder="Enter venue location"
              />
            </InputGroup>
            <InputGroup>
              <Label>Number of Guests</Label>
              <Input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                placeholder="Expected number of guests"
                min="1"
              />
            </InputGroup>
            <InputGroup>
              <Label>Special Requests</Label>
              <Textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests or requirements?"
                rows="4"
              />
            </InputGroup>
            <ButtonGroup>
              <Button onClick={prevStep} secondary>
                Previous
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : `Book Your Appointment`}
              </Button>
            </ButtonGroup>
          </FormStep>
        );
      default:
        return null;
    }
  };


  return (
    <Wrapper>
      <Container>
        <Left>
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3"
            alt="Event"
          />
          <FeatureList>
            <Feature>
              <span>✓</span> Professional Event Planning
            </Feature>
            <Feature>
              <span>✓</span> Customized Decorations
            </Feature>
            <Feature>
              <span>✓</span> Flexible Scheduling
            </Feature>
            <Feature>
              <span>✓</span> 24/7 Support
            </Feature>
          </FeatureList>
        </Left>
        <Right>
          <Form onSubmit={handleSubmit}>
            <Title>Book Your Appointment</Title>
            <ProgressBar>
              <Progress width={(step / 3) * 100} />
            </ProgressBar>
            {renderStep()}
          </Form>
        </Right>
      </Container>
    </Wrapper>
  );
};


// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background: linear-gradient(135deg, #1f1c2c, #a0001b); */
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1f1c2c, #a0001b);

  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 1s ease-out;
  overflow: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    max-width: 600px;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 1024px) {
    padding: 20px;

    img {
      height: 200px;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;

    img {
      height: 150px;
    }
  }
`;

const FeatureList = styled.div`
  margin-top: 20px;
`;

const Feature = styled.div`
  color: white;
  margin: 15px 0;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    color: #e0aa3e;
    font-weight: bold;
  }
`;

const Right = styled.div`
  flex: 1.2;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 30px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: 30px;
`;

const Progress = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;
  background: #e0aa3e;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const FormStep = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const StepIndicator = styled.div`
  color: #e0aa3e;
  font-size: 1.9rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 8px;
  font-size: 1.4rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1.6rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e0aa3e;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

const Select = styled.select`
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1.6rem;
  width: 100%;
  cursor: pointer;

  option {
    background: #1f1c2c;
    color: white;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1.6rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #e0aa3e;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.secondary ? "rgba(255, 255, 255, 0.1)" : "#a0001b"};
  color: white;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 100%
      );
      animation: ${shimmer} 1.5s infinite;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default Appointment;
