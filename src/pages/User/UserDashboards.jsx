import Sidebar from "../../components/common/Sidebar";

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { motion } from "framer-motion";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import { Badge } from 'primereact/badge';


import AnimatedStats from "../../components/common/AnimatedStats";

import UniversalButton from "../../components/common/UniversalButton";

const UserDashboards = () => {
 
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);





  const handleOpenNotification = () => {
    setNotificationDrawerOpen(true);
  }

 

  const renderNotificationDrawer = () => {

    const notifications = [
      {
        id: 1,
        title: "Task Assigned",
        message: "You have been assigned a new task: 'Fix navbar responsiveness'.",
        date: "2025-03-25 10:00 AM",
        sender: "Manager",
      },
      {
        id: 2,
        title: "Task Deadline Reminder",
        message: "The task 'Test payment flow' is due tomorrow.",
        date: "2025-03-26 09:00 AM",
        sender: "Admin",
      },
    ];

    const [reminders, setReminders] = useState([
      {
        id: 1,
        title: "Weekly Meeting",
        message: "Don't forget the weekly team meeting at 3:00 PM.",
        date: "2025-03-27 02:00 PM",
        sender: "Manager",
        replies: [],
      },
      {
        id: 2,
        title: "Submit Report",
        message: "Please submit the monthly report by the end of the day.",
        date: "2025-03-28 11:00 AM",
        sender: "Admin",
        replies: [],
      },
    ]);

    const [editingReminderId, setEditingReminderId] = useState(null);
    const [replyText, setReplyText] = useState("");

    const handleEditReminder = (id) => {
      if (editingReminderId === id) {
        // If the same reminder is clicked again, close the input and clear the text
        setEditingReminderId(null);
        setReplyText("");
      } else {
        setEditingReminderId(id);
      }
    };

    const handleReplySubmit = (id) => {
      const updatedReminders = reminders.map((reminder) => {
        if (reminder.id === id) {
          return {
            ...reminder,
            replies: [
              ...reminder.replies,
              {
                text: replyText,
                timestamp: new Date().toLocaleString(),
              },
            ],
          };
        }
        return reminder;
      });

      setReminders(updatedReminders);
      setEditingReminderId(null);
      setReplyText("");
    };

   

    return (
      <Drawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "400px",
            padding: "16px",
            backgroundColor: "#f9fafb",
          },
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#333",
              marginBottom: "16px",
            }}
          >
            Your Reminders & Notifications
          </Typography>

          {/* Notifications Section */}
          <Box mb={4}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "#6366f1",
                marginBottom: "8px",
              }}
            >
              Notifications
            </Typography>
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "12px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "600", color: "#333" }}
                >
                  {notification.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "8px" }}
                >
                  {notification.message}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#888", display: "block" }}
                >
                  {notification.date} - {notification.sender}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Reminders Section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "600",
                color: "#6366f1",
                marginBottom: "8px",
              }}
            >
              Reminders
            </Typography>
            {reminders.map((reminder) => (
              <Box
                key={reminder.id}
                sx={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "12px",
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "600", color: "#333" }}
                  >
                    {reminder.title}
                  </Typography>
                  {/* <IconButton
                    size="small"
                    onClick={() => handleEditReminder(reminder.id)}
                  >
                    <EditIcon sx={{ fontSize: "1rem", color: "#6366f1" }} />
                  </IconButton> */}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginBottom: "8px" }}
                >
                  {reminder.message}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#888", display: "block", marginBottom: "8px" }}
                >
                  {reminder.date} - {reminder.sender}
                </Typography>

                {/* Reply Section */}
                {reminder.replies.length > 0 && (
                  <Box
                    sx={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#f1f5f9",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600", color: "#333", marginBottom: "4px" }}
                    >
                      Replies:
                    </Typography>
                    {reminder.replies.map((reply, index) => (
                      <Box key={index} sx={{ marginBottom: "4px" }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#555", marginBottom: "2px" }}
                        >
                          {reply.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#888" }}
                        >
                          {reply.timestamp}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Input for Reply */}
                {editingReminderId === reminder.id && (
                  <Box>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      sx={{
                        marginBottom: "8px",
                        padding: "8px",
                        outline: "none",
                        border: "none",
                      }}
                    />
                    <div className="flex items-center justify-between" >
                      <UniversalButton
                        label="Submit Reply"
                        onClick={() => handleReplySubmit(reminder.id)}
                      />
                      <Tooltip title="Delete reply" arrow>

                        <IconButton
                          size="small"
                          onClick={() => handleEditReminder(reminder.id)}
                        >
                          <DeleteIcon sx={{ fontSize: "1rem", color: "red" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    );
  };

 
  return (
    <Box p={2}>
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
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 mx-auto hidden md:block">
              <lottie-player
                autoplay
                loop
                mode="normal"
                // src="/animation/handwave.json"
                 src="https://assets3.lottiefiles.com/packages/lf20_0yfsb3a1.json"
                style={{ width: "100%", height: "100%" }}
              ></lottie-player>
            </div>
            <div className="flex">
              <div>
              <h1 className="md:text-2xl text-lg font-semibold text-gray-700 flex items-center justify-center mb-4">
                Welcome back, "User"
              </h1>
              <h2 className="md:text-lg text-sm text-gray-500">
                Here's what's happening with your workspace today.
              </h2>
              </div>
              <div className="relative block md:hidden">
                <Tooltip title="Notifications" arrow>
                  <IconButton
                    onClick={handleOpenNotification}
                    className="relative"
                  >
                    <NotificationsIcon sx={{ color: "#6366f1", fontSize: "24px" }} />

                    {/* Notification Badge */}
                    <div className="absolute top-1 right-1">
                      <div className="text-xs bg-red-400 text-white rounded-full h- w-4 flex items-center justify-center">
                        1
                      </div>
                    </div>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
          <Tooltip title="Notifications" arrow>
            <IconButton onClick={handleOpenNotification} className="flex gap-2" >
              <NotificationsIcon sx={{ color: "#6366f1", fontSize: "30px" }} />
              <div className="absolute top-0 right-1">
                <div className="text-xs bg-red-400 text-white rounded-full h-5 w-5 text-center flex items-center justify-center" >
                  1
                </div>
                {/* <Badge value="2"></Badge> */}
              </div>
            </IconButton>
          </Tooltip>
          </div>
        </Box>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
        <div className="lg:col-span-3">
          <AnimatedStats />
        </div>
      </div>

    

      {renderNotificationDrawer()}
    </Box>
  );
};

export default UserDashboards;
