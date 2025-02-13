import Appointment from "../models/Appointment.js";
import Service from "../models/services.js";

// Route: GET /api/dashboard/revenue
const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Appointment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    
    res.json({ totalRevenue: totalRevenue[0]?.total || 0 });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

const getTotalAppointments = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    res.json({ totalAppointments });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

const getMostPopularService = async (req, res) => {
  try {
    const popularService = await Appointment.aggregate([
      { $group: { _id: "$eventType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    
    res.json({ mostPopularService: popularService[0]?._id || "No Data" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getNewCustomers = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const dailyNewCustomers = await Appointment.aggregate([
      { $match: { date: { $gte: startOfDay.toISOString().split("T")[0] } } },
      { $group: { _id: "$contact" } },
      { $count: "dailyCount" }
    ]);

    const weeklyNewCustomers = await Appointment.aggregate([
      { $match: { date: { $gte: startOfWeek.toISOString().split("T")[0] } } },
      { $group: { _id: "$contact" } },
      { $count: "weeklyCount" }
    ]);

    const monthlyNewCustomers = await Appointment.aggregate([
      { $match: { date: { $gte: startOfMonth.toISOString().split("T")[0] } } },
      { $group: { _id: "$contact" } },
      { $count: "monthlyCount" }
    ]);

    const dailyCount = dailyNewCustomers[0]?.dailyCount || 0;
    const weeklyCount = weeklyNewCustomers[0]?.weeklyCount || 0;
    const monthlyCount = monthlyNewCustomers[0]?.monthlyCount || 0;

    res.json({
      dailyNewCustomers: dailyCount,
      weeklyNewCustomers: weeklyCount,
      monthlyNewCustomers: monthlyCount
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};
const getNewCustomersChart = async (req, res) => {
  try {
    const chartData = await Appointment.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" },
        },
      },
      {
        $facet: {
          daily: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
                totalCustomers: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
          ],
          weekly: [
            {
              $group: {
                _id: { year: { $year: "$date" }, week: { $week: "$date" } },
                totalCustomers: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } },
          ],
          monthly: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                totalCustomers: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
          ],
        },
      },
    ]);

    res.json(chartData[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};


const getRevenueChart = async (req, res) => {
  try {
    const chartData = await Appointment.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" },
        },
      },
      {
        $facet: {
          daily: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
                totalRevenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
          ],
          weekly: [
            {
              $group: {
                _id: { year: { $year: "$date" }, week: { $week: "$date" } },
                totalRevenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } },
          ],
          monthly: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                totalRevenue: { $sum: "$price" },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
          ],
        },
      },
    ]);

    res.json(chartData[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};


const getAppointmentsChart = async (req, res) => {
  try {
    const chartData = await Appointment.aggregate([
      {
        $addFields: {
          date: { $toDate: "$date" },
        },
      },
      {
        $facet: {
          daily: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
                total: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
          ],
          monthly: [
            {
              $group: {
                _id: { year: { $year: "$date" }, month: { $month: "$date" } },
                total: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
          ],
          yearly: [
            {
              $group: {
                _id: { year: { $year: "$date" } },
                total: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1 } },
          ],
        },
      },
    ]);

    res.json(chartData[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error });
  }
};

export { getTotalRevenue, getTotalAppointments, getMostPopularService, getNewCustomers, getNewCustomersChart, getRevenueChart, getAppointmentsChart };
