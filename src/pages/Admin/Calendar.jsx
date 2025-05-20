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

const Calendar = ({
  filter,
  setFilter,
  filteredEvents,
  handleDateClick,
  openModal,
  setOpenModal,
  selectedDate,
  reminderTitle,
  setReminderTitle,
  reminderDesc,
  setReminderDesc,
  reminderStatus,
  setReminderStatus,
  handleTaskSubmit,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: `calc(100vh - ${isXs ? "56px" : "64px"})`,
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: "100%" }}>
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
                <Typography
                  variant={isXs ? "h6" : "h5"}
                  fontWeight={600}
                  sx={{ wordBreak: "break-word" }}
                >
                  📌 Set Reminder
                </Typography>
                <FormControl size="small" sx={{ minWidth: isXs ? "100%" : 140 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filter}
                    label="Status"
                    onChange={(e) => setFilter(e.target.value)}
                    size={isXs ? "small" : "medium"}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Calendar */}
              <Box
                sx={{
                  flexGrow: 1,
                  height: isXs ? "calc(100vh - 140px)" : "calc(100% - 56px)",
                }}
              >
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView={isXs ? "dayGridWeek" : "dayGridMonth"}
                  dateClick={handleDateClick}
                  events={filteredEvents}
                  height="100%"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: isXs
                      ? "dayGridWeek,dayGridDay"
                      : "dayGridMonth,dayGridWeek",
                  }}
                />
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: "90%", sm: 400 },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            sx={{ wordBreak: "break-word", textAlign: isXs ? "center" : "left" }}
          >
            📌 Set Reminder for {selectedDate?.format("DD MMM YYYY")}
          </Typography>

          <TextField
            fullWidth
            label="Reminder Title"
            value={reminderTitle}
            onChange={(e) => setReminderTitle(e.target.value)}
            sx={{ mb: 2 }}
            size={isXs ? "small" : "medium"}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Reminder Description"
            value={reminderDesc}
            onChange={(e) => setReminderDesc(e.target.value)}
            sx={{ mb: 2 }}
            size={isXs ? "small" : "medium"}
          />

          <TextField
            select
            fullWidth
            label="Status"
            value={reminderStatus}
            onChange={(e) => setReminderStatus(e.target.value)}
            sx={{ mb: 2 }}
            size={isXs ? "small" : "medium"}
          >
            <MenuItem value="Pending">Normal</MenuItem>
            <MenuItem value="Completed">Urgent</MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTaskSubmit}
            disabled={!reminderTitle || !reminderDesc}
            size={isXs ? "medium" : "large"}
          >
            Save Task
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
