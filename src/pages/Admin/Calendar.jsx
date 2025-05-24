import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Modal,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import toast from "react-hot-toast";

import dayjs from "dayjs";

const Calendar = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // small screen check
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [selectedDate, setSelectedDate] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [reminderTitle, setReminderTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [reminderStatus, setReminderStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);

  const users = [
    { name: "Sonia", role: "Manager", status: "online" },
    { name: "Arun", role: "User", status: "offline" },
    { name: "Fatima", role: "User", status: "online" },
  ];

  const handleDateClick = (info) => {
    setSelectedDate(dayjs(info.date));
    setOpenModal(true);
  };

  const handleTaskSubmit = () => {
    const newEvent = {
      title: `${reminderTitle} (${reminderStatus}) - ${assignedTo}`,
      date: selectedDate.format("YYYY-MM-DD"),
      backgroundColor: reminderStatus === "Completed" ? "#4ade80" : "#facc15",
    };
    setEvents([...events, newEvent]);
    setReminderTitle("");
    setAssignedTo("");
    setReminderStatus("Pending");
    setOpenModal(false);
    toast.success("Reminder set successfully 🎉");
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
    <>
      <Box
        sx={{
          height: `calc(100vh - ${isXs ? "56px" : "64px"})`,
          width: "100%",
          p: { xs: 1, sm: 2, md: 3 },
          boxSizing: "border-box",
          overflow: "hidden",
          // backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sx={{ height: "100%" }}>
            {" "}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ height: "100%" }}
            >
              <Paper
                sx={{
                  height: "100%",
                  p: { xs: 1.5, sm: 3 },
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={4}
              >
                {/* Header with Title and Filter */}
                <Box
                  display="flex"
                  flexDirection={isXs ? "column" : "row"}
                  justifyContent="space-between"
                  alignItems={isXs ? "flex-start" : "center"}
                  mb={2}
                  gap={isXs ? 1.5 : 0}
                >
                  <Typography variant="h6" fontWeight={600}>
                    📅 Set Reminder
                  </Typography>
                  <FormControl size="medium">
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
              Assign Reminder for {selectedDate?.format("DD MMM YYYY")}
            </Typography>
            <TextField
              fullWidth
              label="Reminder Title"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
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
              value={reminderStatus}
              onChange={(e) => setReminderStatus(e.target.value)}
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
              disabled={!reminderTitle || !assignedTo}
            >
              Set Reminder
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Calendar;
