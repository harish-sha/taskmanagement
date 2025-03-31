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
import dayjs from "dayjs";
import { useState } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AnimatedStats from "../../components/common/AnimatedStats";
import ActivityFeed from "../../components/common/ActivityFeed";

import Sidebar from "../../components/common/Sidebar";
import { DataTable } from "../../components/common/DataTable";


const ManagerDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");



  const handleDateClick = (info) => {
    setSelectedDate(dayjs(info.date));
    setOpenModal(true);
  };

  const users = [
    { name: "Sonia", role: "Manager", status: "online" },
    { name: "Arun", role: "User", status: "offline" },
    { name: "Fatima", role: "User", status: "online" },
  ];

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




  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((e) => e.title.includes(`(${filter})`));

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'templateName', headerName: 'Template Name', flex: 1, minWidth: 120 },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 120 },
    { field: 'health', headerName: 'Health', flex: 1, minWidth: 120 },
    { field: 'createdDate', headerName: 'Created At', flex: 1, minWidth: 120 },
  ];

  // use this when you want to create rows dynamically
  const rows = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    sn: i + 1,
    templateName: 'Ram',
    category: 'Sharma',
    status: 66,
    type: '5',
    health: 'High',
    createdDate: '12/10/2024',
    action: 'True',
  }));
  return (
    // <div className="p-6 space-y-6">
    //   <Sidebar role="manager" />

    //   <h1 className="text-2xl font-bold">Manager Dashboard</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     <div className="bg-white shadow rounded p-6">
    //       <h2 className="font-semibold text-lg mb-2">Assign Users</h2>
    //       <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Assign New User</button>
    //     </div>
    //     <div className="bg-white shadow rounded p-6">
    //       <h2 className="font-semibold text-lg mb-2">My Team</h2>
    //       <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
    //         <li>User A - 3 Tasks</li>
    //         <li>User B - 5 Tasks</li>
    //       </ul>
    //     </div>
    //     <div className="bg-white shadow rounded p-6">
    //       <h2 className="font-semibold text-lg mb-2">Activity Feed</h2>
    //       <ul className="text-xs text-gray-600 space-y-1">
    //         <li>✅ User A completed 'Fix header bug'</li>
    //         <li>⏳ User B started 'API integration'</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <Box display="flex" minHeight="100vh" bgcolor="#f8fafc">
      <Sidebar role="manager" />
      <Box flex={1} p={3}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={5}
            px={4}
            py={3}
            bgcolor="#ffffff"
            borderRadius={3}
            boxShadow={3}
          >
            <Box>
              <Typography variant="h5" fontWeight={700} color="#0f172a">
                👋 Welcome back, Manager
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here's what's happening with your workspace today.
              </Typography>
            </Box>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsIcon sx={{ color: "#6366f1" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </motion.div>

        <main className="flex mb-4 items-center justify-end">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >

            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow-md cursor-pointer">
              + New Task
            </button>
          </motion.div>
        </main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AnimatedStats />
          </div>
          <ActivityFeed />
        </div>

        <DataTable
          id="transactionshistorytable"
          name="transactionshistorytable"
          col={columns}
          rows={rows}
        />

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
        </Grid>

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

export default ManagerDashboard;
