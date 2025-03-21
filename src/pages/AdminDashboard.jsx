import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
// import Sidebar from '../components/Sidebar';
import Sidebar from "../components/common/Sidebar";

import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  FaCheckCircle,
  FaClock,
  FaTasks,
  FaExclamationTriangle,
} from "react-icons/fa";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AnimatedStats from "../components/common/AnimatedStats";
import ActivityFeed from "../components/common/ActivityFeed";
import {
  // FaTasks,
  FaUsers,
  FaChartLine,
  FaBell,
  FaUserShield,
  FaMoon,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const roles = ["Manager", "User"];
const users = [
  { name: "Sonia", role: "Manager", status: "online" },
  { name: "Arun", role: "User", status: "offline" },
  { name: "Fatima", role: "User", status: "online" },
];

const StatCard = ({ icon, label, count, color }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderLeft: `5px solid ${color}`,
      }}
    >
      <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
      <Box>
        <Typography fontSize={14} color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={700} fontSize={20}>
          {count}
        </Typography>
      </Box>
    </Paper>
  </motion.div>
);

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [newRole, setNewRole] = useState("User");

  const handleDateClick = (info) => {
    setSelectedDate(dayjs(info.date));
    setOpenModal(true);
  };

  const handleTaskSubmit = () => {
    const newEvent = {
      title: `${taskTitle} (${taskStatus}) - ${assignedTo}`,
      date: selectedDate.format("YYYY-MM-DD"),
      backgroundColor: taskStatus === "Completed" ? "#4ade80" : "#facc15",
    };
    setEvents([...events, newEvent]);
    setTaskTitle("");
    setAssignedTo("");
    setTaskStatus("Pending");
    setOpenModal(false);
  };

  const pendingCount = events.filter((e) =>
    e.title.includes("(Pending)")
  ).length;
  const completedCount = events.filter((e) =>
    e.title.includes("(Completed)")
  ).length;
  const overdueCount = 2;

  const taskStats = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [pendingCount, completedCount],
        backgroundColor: ["#f59e0b", "#10b981"],
      },
    ],
  };

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((e) => e.title.includes(`(${filter})`));

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f8fafc">
      <Sidebar role="admin" />
      <Box flex={1} p={4}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            px={4}
            py={3}
            bgcolor="#ffffff"
            borderRadius={3}
            boxShadow={3}
          >
            <Box>
              <Typography variant="h5" fontWeight={700} color="#0f172a">
                👋 Welcome back, Admin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here’s what’s happening with your workspace today.
              </Typography>
            </Box>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsIcon sx={{ color: "#6366f1" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </motion.div>

        {/* 🔥 Modern Stat Cards Section */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<FaTasks />}
              label="Total Tasks"
              count={events.length}
              color="#3b82f6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<FaCheckCircle />}
              label="Completed"
              count={completedCount}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<FaClock />}
              label="Pending"
              count={pendingCount}
              color="#f59e0b"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              icon={<FaExclamationTriangle />}
              label="Overdue"
              count={overdueCount}
              color="#ef4444"
            />
          </Grid>
        </Grid>

        <main className="flex-1 p-8 space-y-10">
          {/* Header */}
          <header className="flex justify-between items-center">
            {/* <h2 className="text-3xl font-bold">Welcome Admin</h2> */}
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow">
              + New Task
            </button>
          </header>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-xl shadow-xl">
              <p className="text-sm text-slate-300">Total Tasks</p>
              <h3 className="text-2xl font-semibold mt-2">320</h3>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 rounded-xl shadow-xl">
              <p className="text-sm text-slate-300">Completed</p>
              <h3 className="text-2xl font-semibold mt-2">214</h3>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-400 p-5 rounded-xl shadow-xl">
              <p className="text-sm text-slate-800">Pending</p>
              <h3 className="text-2xl font-semibold mt-2 text-slate-800">86</h3>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-pink-500 p-5 rounded-xl shadow-xl">
              <p className="text-sm text-slate-100">Overdue</p>
              <h3 className="text-2xl font-semibold mt-2">20</h3>
            </div>
          </div>

          {/* Add more sections here (e.g., charts, task table, calendar, activity feed) */}
        </main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatedStats />
            {/* other components */}
          </div>
          <ActivityFeed />
        </div>

        {/* 📅 Task Calendar + 📊 Stats Chart Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Paper sx={{ p: 3 }} elevation={4}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6" fontWeight={600}>
                    📅 Calendar
                  </Typography>
                  <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filter}
                      label="Status"
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  dateClick={handleDateClick}
                  events={filteredEvents}
                  height={500}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridWeek",
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Paper sx={{ p: 3, height: "100%" }} elevation={4}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  📊 Task Stats
                </Typography>
                <Bar data={taskStats} />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* 📝 Assign Task Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              minWidth: 400,
            }}
          >
            <Typography variant="h6" mb={2}>
              Assign Task for {selectedDate?.format("DD MMM YYYY")}
            </Typography>
            <TextField
              fullWidth
              label="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Assign To"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              sx={{ mb: 2 }}
            >
              {users.map((u, i) => (
                <MenuItem key={i} value={u.name}>
                  {u.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Status"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleTaskSubmit}
              disabled={!taskTitle || !assignedTo}
            >
              Save Task
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
