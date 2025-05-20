import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { motion } from "framer-motion";
import { Paper, Box, Typography, Select, InputLabel, FormControl, MenuItem, Grid, Modal, TextField, Button } from "@mui/material"
import dayjs from "dayjs";





const Calendar = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");





  const roles = ["Manager", "User"];
  const users = [
    { name: "Sonia", role: "Manager", status: "online" },
    { name: "Arun", role: "User", status: "offline" },
    { name: "Fatima", role: "User", status: "online" },
  ];



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




  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-bold mb-10 mt-10'>Set The Remainder</h2>
      <Grid container spacing={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Paper sx={{ p: 4 }} elevation={4}>
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
                // weight={600}
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
    </div>
  )
}

export default Calendar
