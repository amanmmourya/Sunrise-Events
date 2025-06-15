import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "./Sidebar";
import Menubox from "./Menubox";
import { motion } from "framer-motion";
import { GlobalStyle } from "../GlobalStyle";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { useGlobalContext } from "../Context";

function Reports() {
  const { selectedButton } = useGlobalContext();
  const [dailyNewCustomers, setDailyNewCustomers] = useState([]);
  const [weeklyNewCustomers, setWeeklyNewCustomers] = useState([]);
  const [monthlyNewCustomers, setMonthlyNewCustomers] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyAppointments, setDailyAppointments] = useState([]);
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueRes = await axios.get(
          "https://sunrise-events-wty9.onrender.com/dashboard/revenue-chart"
        );
        const appointmentRes = await axios.get(
          "https://sunrise-events-wty9.onrender.com/dashboard/appointments-chart"
        );
        const customerRes = await axios.get(
          "https://sunrise-events-wty9.onrender.com/dashboard/customers-chart"
        );

        setDailyRevenue(revenueRes.data.daily || []);
        setWeeklyRevenue(revenueRes.data.weekly || []);
        setMonthlyRevenue(revenueRes.data.monthly || []);
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
          color: '#070000',
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
          color: '#070000'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#070000'
        }
      }
    }
  };

  const servicesData = {
    labels: ['Wedding Planning', 'Venue Decoration', 'Catering', 'Photography'],
    datasets: [{
      data: [40, 25, 15, 20],
      backgroundColor: [
        '#a0001b',
        '#e0aa3e',
        '#ffffff',
        'rgba(160, 0, 27, 0.7)'
      ],
      borderColor: '#1a1a1a',
      borderWidth: 1
    }]
  };

  const dailyRevenueChartData = {
    labels: dailyRevenue.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily Revenue",
        data: dailyRevenue.map((entry) => entry.totalRevenue),
        backgroundColor: '#a0001b',
        borderColor: '#e0aa3e',
        borderWidth: 2,
      },
    ],
  };

  const weeklyRevenueChartData = {
    labels: weeklyRevenue.map(
      (entry) => `week ${entry._id.week}, ${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly Revenue",
        data: weeklyRevenue.map((entry) => entry.totalRevenue),
        backgroundColor: '#e0aa3e',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  const monthlyRevenueChartData = {
    labels: monthlyRevenue.map(
      (entry) => `Month ${entry._id.month}, ${entry._id.year}`
    ),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenue.map((entry) => entry.totalRevenue),
        backgroundColor: '#ffffff',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  const dailyAppointmentsChartData = {
    labels: dailyAppointments.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily Appointments",
        data: dailyAppointments.map((entry) => entry.total),
        backgroundColor: '#a0001b',
        borderColor: '#e0aa3e',
        borderWidth: 2,
      },
    ],
  };

  const weeklyAppointmentsChartData = {
    labels: weeklyAppointments.map(
      (entry) => `Week ${entry._id.week}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly Appointments",
        data: weeklyAppointments.map((entry) => entry.total),
        backgroundColor: '#e0aa3e',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  const monthlyAppointmentsChartData = {
    labels: monthlyAppointments.map(
      (entry) => `Month ${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Monthly Appointments",
        data: monthlyAppointments.map((entry) => entry.total),
        backgroundColor: '#ffffff',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  const dailyCustomersChartData = {
    labels: dailyNewCustomers.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Daily New Customers",
        data: dailyNewCustomers.map((entry) => entry.totalCustomers),
        backgroundColor: '#a0001b',
        borderColor: '#e0aa3e',
        borderWidth: 2,
      },
    ],
  };

  const weeklyCustomersChartData = {
    labels: weeklyNewCustomers.map(
      (entry) => `${entry._id.day}-${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Weekly New Customers",
        data: weeklyNewCustomers.map((entry) => entry.totalCustomers),
        backgroundColor: '#e0aa3e',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  const monthlyCustomersChartData = {
    labels: monthlyNewCustomers.map(
      (entry) => `Month ${entry._id.month}-${entry._id.year}`
    ),
    datasets: [
      {
        label: "Monthly New Customers",
        data: monthlyNewCustomers.map((entry) => entry.totalCustomers),
        backgroundColor: '#ffffff',
        borderColor: '#a0001b',
        borderWidth: 2,
      },
    ],
  };

  switch (selectedButton) {
    case "button1":
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
            <Menubox />
            
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
                <ChartTitle>Weekly Revenue</ChartTitle>
                <ChartContainer>
                  {weeklyRevenue.length > 0 ? (
                    <Bar data={weeklyRevenueChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading weekly data...</LoadingText>
                  )}
                </ChartContainer>
              </ChartBox>

              <ChartBox
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ChartTitle>Monthly Revenue</ChartTitle>
                <ChartContainer>
                  {monthlyRevenue.length > 0 ? (
                    <Bar data={monthlyRevenueChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading monthly revenue data...</LoadingText>
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

    case "button2":
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
            <Menubox />
            
            <DashboardGrid>
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
                    <LoadingText>Loading chart data...</LoadingText>
                  )}
                </ChartContainer>
              </ChartBox>

              <ChartBox
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ChartTitle>Weekly Customers</ChartTitle>
                <ChartContainer>
                  {weeklyNewCustomers.length > 0 ? (
                    <Bar data={weeklyCustomersChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading weekly data...</LoadingText>
                  )}
                </ChartContainer>
              </ChartBox>

              <ChartBox
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ChartTitle>Monthly Customers</ChartTitle>
                <ChartContainer>
                  {monthlyNewCustomers.length > 0 ? (
                    <Bar data={monthlyCustomersChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading monthly new customers data...</LoadingText>
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

    case "button3":
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
            <Menubox />
            
            <DashboardGrid>
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
                    <LoadingText>Loading chart data...</LoadingText>
                  )}
                </ChartContainer>
              </ChartBox>

              <ChartBox
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ChartTitle>Weekly Appointments</ChartTitle>
                <ChartContainer>
                  {weeklyAppointments.length > 0 ? (
                    <Bar data={weeklyAppointmentsChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading weekly data...</LoadingText>
                  )}
                </ChartContainer>
              </ChartBox>

              <ChartBox
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <ChartTitle>Monthly Appointments</ChartTitle>
                <ChartContainer>
                  {monthlyAppointments.length > 0 ? (
                    <Bar data={monthlyAppointmentsChartData} options={chartOptions} />
                  ) : (
                    <LoadingText>Loading monthly revenue data...</LoadingText>
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
  }
}

const DashboardWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9f7f7;
  padding: 6rem 0 2rem 0;

  color: black;
`;

const DashboardContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  color: black;


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
  color: black;


  .weekly-revenue {
    grid-column: span 2;
    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }
`;

const ChartBox = styled(motion.div)`
  background: #f9f7f7;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2),
              0 10px 15px rgba(160, 0, 27, 0.1);
  border: 1px solid #a0001b;
  height: 400px;
  display: flex;
  flex-direction: column;
  color: #b01414;
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
  color: black;

`;

const LoadingText = styled.p`
  color: #242121;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;

`;

export default Reports;