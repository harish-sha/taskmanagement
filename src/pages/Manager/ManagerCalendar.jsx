import React, {useState} from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import toast from 'react-hot-toast';
import UniversalButton from "../../components/common/UniversalButton";


const ManagerCalendar = () => {
    const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // small screen check

  const [filter, setFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDesc, setReminderDesc] = useState("");
  const [reminderStatus, setReminderStatus] = useState("Pending");



  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const users = [
    { name: "Alice" },
    { name: "Bob" },
    { name: "Charlie" },
  ];

  const allEvents = [
    { title: "Tommorow will be holiday", date: "2025-05-21", status: "Pending" },
    { title: "hello", date: "2025-05-22", status: "Completed" },
  ];

  const filteredEvents =
    filter === "All"
      ? allEvents
      : allEvents.filter((event) => event.status === filter);

  const handleDateClick = (info) => {
    setSelectedDate(dayjs(info.date));   
    setOpenModal(true);
  };

  const handleTaskSubmit = () => {
    setOpenModal(false);
    setReminderTitle("");
    setReminderDesc("");
    toast.success("Reminder set successfully ")
  };

  return (
    <>

 <Box
      sx={{
        minHeight: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              sx={{
                p: { xs: 1, sm: 2, md: 3 },
                borderRadius: 2,
                height: "100%",
              }}
              elevation={2}
            >
              {/* Header Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  gap: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant={isXs ? "h6" : "h5"}
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" }
                  }}
                >
                  📌 Set Reminder
                </Typography>
                
                <FormControl 
                  size={isXs ? "small" : "medium"}
                  sx={{ 
                    minWidth: { xs: "100%", sm: 200 },
                    backgroundColor: "background.paper" 
                  }}
                >
                  <InputLabel>Filter Status</InputLabel>
                  <Select
                    value={filter}
                    label="Filter Status"
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <MenuItem value="All">All Events</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Calendar Section */}
              {/* <Box
                sx={{
                  height: { xs: "60vh", sm: "65vh", md: "70vh" },
                  "& .fc": {
                    height: "100%",
                    "& .fc-toolbar": {
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 0 },
                      mb: { xs: 2, sm: 3 }
                    },
                    "& .fc-toolbar-title": {
                      fontSize: { xs: "1.1rem", sm: "1.3rem" }
                    },
                    "& .fc-button": {
                      padding: { xs: "6px 12px", sm: "8px 16px" }
                    }
                  }
                }}
              >
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView={isMd ? "dayGridWeek" : "dayGridMonth"}
                  dateClick={handleDateClick}
                  events={filteredEvents}
                  height="100%"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: isMd ? "dayGridWeek,dayGridDay" : "dayGridMonth,dayGridWeek"
                  }}
                />
              </Box> */}

              {/* <Box
  sx={{
    height: { xs: "60vh", sm: "65vh", md: "70vh" },
    "& .fc": {
      height: "100%",
      "& .fc-toolbar": {
        flexDirection: "row !important", // Force row direction
        justifyContent: "space-between",
        alignItems: "center",
        gap: { xs: 0.5, sm: 1 },
        mb: { xs: 2, sm: 3 },
        padding: { xs: "0 4px", sm: "0 8px" }
      },
      "& .fc-toolbar-title": {
        fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" }
      },
      "& .fc-button": {
        padding: { xs: "4px 8px", sm: "6px 12px" },
        fontSize: { xs: "0.75rem", sm: "0.875rem" },
        margin: { xs: "0 2px", sm: "0 4px" }
      },
      "& .fc-today-button": {
        padding: { xs: "4px 8px", sm: "6px 12px" }
      },
      // Make buttons more compact on mobile
      "& .fc-button-group": {
        gap: { xs: 0, sm: 1 }
      }
    }
  }}
> */}
<Box
  sx={{
    height: { xs: "60vh", sm: "65vh", md: "70vh" },
    "& .fc": {
      height: "100%",
      "& .fc-toolbar": {
        flexDirection: "row !important",
        justifyContent: "space-between",
        alignItems: "center",
        mb: { xs: 2, sm: 3 },
        padding: { xs: "0 4px", sm: "0 8px" }
      },
      "& .fc-toolbar-title": {
        fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" }
      },
      // Remove gaps between buttons within button groups
      "& .fc-button-group": {
        gap: 0,
        "& .fc-button": {
          margin: 0,
          borderRadius: 0,
        },
        "& .fc-button:first-of-type": {
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        },
        "& .fc-button:last-of-type": {
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
        }
      },
      // Style individual buttons
      "& .fc-button": {
        padding: { xs: "4px 8px", sm: "6px 12px" },
        fontSize: { xs: "0.75rem", sm: "0.875rem" }
      },
      // Add margin only to standalone buttons (like 'today')
      "& .fc-today-button": {
        margin: { xs: "0 4px", sm: "0 8px" },
        padding: { xs: "4px 8px", sm: "6px 12px" }
      }
    }
  }}
>
  <FullCalendar
    plugins={[dayGridPlugin, interactionPlugin]}
    initialView={isMd ? "dayGridWeek" : "dayGridMonth"}
    dateClick={handleDateClick}
    events={filteredEvents}
    height="100%"
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: isMd ? "dayGridWeek,dayGridDay" : "dayGridMonth,dayGridWeek"
    }}
  />
</Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Responsive Modal */}
      <Modal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        aria-labelledby="reminder-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "80%", md: 500 },
            maxHeight: { xs: "95vh", sm: "80vh" },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            overflowY: "auto"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              textAlign: { xs: "center", sm: "left" }
            }}
          >
            📌 Set Reminder for {selectedDate?.format("DD MMM YYYY")}
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              label="Reminder Title"
              value={reminderTitle}
              onChange={(e) => setReminderTitle(e.target.value)}
              size={isXs ? "small" : "medium"}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Reminder Description"
              value={reminderDesc}
              onChange={(e) => setReminderDesc(e.target.value)}
              size={isXs ? "small" : "medium"}
            />

            <TextField
              select
              fullWidth
              label="Priority"
              value={reminderStatus}
              onChange={(e) => setReminderStatus(e.target.value)}
              size={isXs ? "small" : "medium"}
            >
              <MenuItem value="Pending">Normal</MenuItem>
              <MenuItem value="Completed">Urgent</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <UniversalButton
                id="saveCalendar"
                name="saveCalendar"
                label="Save Reminder"
                onClick={handleTaskSubmit}
                disabled={!reminderTitle || !reminderDesc}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
   
    </>
  );
};

export default ManagerCalendar;