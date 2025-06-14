import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import AdminBox from "../components/Adminbox";
import { GlobalStyle } from "../GlobalStyle";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const NewDash = () => {
  const [revenue, setRevenue] = useState(0);
  const [popularService, setPopularService] = useState("");
  const [revenueChart, setRevenueChart] = useState([]);
  const [dailyNewCustomers, setDailyNewCustomers] = useState([]);
  const [weeklyNewCustomers, setWeeklyNewCustomers] = useState([]);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, serviceRes, appointmentRes, customerRes, chartRes] = await Promise.all([
          axios.get("http://localhost:5000/dashboard/revenue"),
          axios.get("http://localhost:5000/dashboard/popular-service"),
          axios.get("http://localhost:5000/dashboard/appointments-chart"),
          axios.get("http://localhost:5000/dashboard/customers-chart"),
          axios.get("http://localhost:5000/dashboard/revenue-chart")
        ]);

        setDailyRevenue(chartRes.data.daily || []);
        setWeeklyRevenue(chartRes.data.weekly || []);
        setMonthlyRevenue(chartRes.data.monthly || []);
        setDailyAppointments(appointmentRes.data.daily || []);
        setWeeklyAppointments(appointmentRes.data.weekly || []);
        setMonthlyAppointments(appointmentRes.data.monthly || []);
        setDailyNewCustomers(customerRes.data.daily || []);
        setWeeklyNewCustomers(customerRes.data.weekly || []);
        setMonthlyNewCustomers(customerRes.data.monthly || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#170000',
          font: {
            family: "'Poppins', sans-serif",
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#170000'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#170000'
        }
      }
    }
  };

  const dailyRevenueChartData = {
    labels: dailyRevenue.map(entry => `${entry._id.day}-${entry._id.month}`),
    datasets: [{
      label: 'Daily Revenue',
      data: dailyRevenue.map(entry => entry.totalRevenue),
      backgroundColor: '#a0001b',
      borderColor: '#fff',
      borderWidth: 2
    }]
  };

  const dailyAppointmentsChartData = {
    labels: dailyAppointments.map(entry => `${entry._id.day}-${entry._id.month}`),
    datasets: [{
      label: 'Daily Appointments',
      data: dailyAppointments.map(entry => entry.total),
      backgroundColor: '#e0aa3e',
      borderColor: '#fff',
      borderWidth: 2
    }]
  };

  const dailyCustomersChartData = {
    labels: dailyNewCustomers.map(entry => `${entry._id.day}-${entry._id.month}`),
    datasets: [{
      label: 'New Customers',
      data: dailyNewCustomers.map(entry => entry.totalCustomers),
      backgroundColor: '#a0001b',
      borderColor: '#fff',
      borderWidth: 2
    }]
  };

  const servicesData = {
    labels: ['Wedding Planning', 'Venue Decoration', 'Catering', 'Photography'],
    datasets: [{
      data: [40, 25, 15, 20],
      backgroundColor: [
        '#a0001b',
        '#e0aa3e',
        '#C08081	',
        'rgba(160, 0, 27, 0.7)'
      ],
      borderColor: '#fff',
      borderWidth: 1
    }]
  };

  return (
    <DashboardWrapper>
      <GlobalStyle />
      <DashboardContainer
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        <AdminBox />
        
        <DashboardGrid>
          <ChartBox
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ChartTitle>Daily Revenue</ChartTitle>
            <ChartContainer>
              {dailyRevenue.length > 0 ? (
                <Bar data={dailyRevenueChartData} options={chartOptions} />
              ) : (
                <LoadingText>Loading chart data...</LoadingText>
              )}
            </ChartContainer>
          </ChartBox>

          <ChartBox
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ChartTitle>Daily Appointments</ChartTitle>
            <ChartContainer>
              {dailyAppointments.length > 0 ? (
                <Bar data={dailyAppointmentsChartData} options={chartOptions} />
              ) : (
                <LoadingText>Loading appointments data...</LoadingText>
              )}
            </ChartContainer>
          </ChartBox>

          <ChartBox
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ChartTitle>Daily Customers</ChartTitle>
            <ChartContainer>
              {dailyNewCustomers.length > 0 ? (
                <Bar data={dailyCustomersChartData} options={chartOptions} />
              ) : (
                <LoadingText>Loading customers data...</LoadingText>
              )}
            </ChartContainer>
          </ChartBox>

          <ChartBox
            className="weekly-revenue"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ChartTitle>Services Overview</ChartTitle>
            <ChartContainer>
              <Pie data={servicesData} options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'right'
                  }
                }
              }} />
            </ChartContainer>
          </ChartBox>
        </DashboardGrid>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding: 6rem 0 2rem 0;
`;

const DashboardContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const DashboardGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  align-items: start;

  .weekly-revenue {
    grid-column: span 2;
    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }
`;

const ChartBox = styled(motion.div)`
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2),
              0 10px 15px rgba(160, 0, 27, 0.1);
  border: 1px solid #660415;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  color: #e0aa3e;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const ChartContainer = styled.div`
  flex: 1;
  position: relative;
  min-height: 300px;
`;

const LoadingText = styled.p`
  color: #170000;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default NewDash;