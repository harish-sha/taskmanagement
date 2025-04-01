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
  Drawer,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Badge } from 'primereact/badge';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import toast from "react-hot-toast";






import NotificationsIcon from "@mui/icons-material/Notifications";
import AnimatedStats from "../../components/common/AnimatedStats";
import ActivityFeed from "../../components/common/ActivityFeed";

import Sidebar from "../../components/common/Sidebar";
import { DataTable } from "../../components/common/DataTable";
import CustomTooltip from "../../components/common/CustomTooltip";
import UniversalButton from "../../components/common/UniversalButton";


const ManagerDashboard = () => {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [issueText, setIssueText] = useState("");
  const [taskIdForIssue, setTaskIdForIssue] = useState(null);
  const [taskHistory, setTaskHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [imageCaptions, setImageCaptions] = useState([]);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  const handleTaskUpdate = (taskId, status) => {
    setTaskStatus(status);
    setTaskHistory((prevHistory) => [
      ...prevHistory,
      {
        taskId,
        action: `Status changed to ${status}`,
        date: new Date().toLocaleString(),
      },
    ]);
    toast.success(`Task status changed to ${status}`);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setTaskStatus(row.status); // Set initial task status
    setEditDrawerOpen(true); // Open the edit drawer
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setTaskIdForIssue(row.id);
    setDrawerOpen(true);
  };

  const handleOpenNotification = () => {
    setNotificationDrawerOpen(true);
  }

  const handleReportIssue = () => {
    const newIssue = {
      taskId: selectedRow.id,
      issue: issueText,
      reportedBy: "User",
      status: "Open",
      reportedAt: new Date().toLocaleString(),
      images: imageUpload,
      captions: imageCaptions,
    };

    setTaskHistory((prevHistory) => [
      ...prevHistory,
      {
        taskId: taskIdForIssue,
        action: `Issue reported: ${issueText}`,
        image: imageUpload,
        date: new Date().toLocaleString(),
      },
    ]);

    setIssueText("");
    setImageUpload([]);
    setImageCaptions([]);
    setEditDrawerOpen(false);
    toast.success("Issue reported successfully!");
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUploads = [...imageUpload, ...files];
    const newImageCaptions = [...imageCaptions, ...files.map(() => "")];

    setImageUpload(newImageUploads);
    setImageCaptions(newImageCaptions);
  };

  // Handle caption change for individual images
  const handleCaptionChange = (index, value) => {
    const updatedCaptions = [...imageCaptions];
    updatedCaptions[index] = value;
    setImageCaptions(updatedCaptions);
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = [...imageUpload];
    const updatedCaptions = [...imageCaptions];
    updatedImages.splice(index, 1);
    updatedCaptions.splice(index, 1);
    setImageUpload(updatedImages);
    setImageCaptions(updatedCaptions);
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
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "task", headerName: "Tasks", flex: 1, minWidth: 120 },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      flex: 1,
      minWidth: 120,
    },
    { field: "dueDate", headerName: "Due Date", flex: 1, minWidth: 120 },
    { field: "assignedBy", headerName: "Assigned By", flex: 1, minWidth: 120 },
    { field: "priority", headerName: "Priority", flex: 1, minWidth: 120 },
    { field: "status", headerName: "Status", flex: 1, minWidth: 120 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="View History" placement="top" arrow>
            <IconButton
              className="text-xs"
              onClick={() => handleView(params.row)}
            >
              <HistoryOutlinedIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Edit Task" placement="top" arrow>
            <IconButton
              className="text-xs"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon sx={{ fontSize: "1.2rem", color: "orange" }} />
            </IconButton>
          </CustomTooltip>
          {/* <CustomTooltip title="Edit Task" placement="top" arrow>
                <IconButton
                  className="text-xs"
                  onClick={() => handleEdit(params.row)}
                >
                  <VisibilityIcon sx={{ fontSize: "1.2rem", color: "green" }} />
                </IconButton>
              </CustomTooltip> */}
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      sn: 1,
      task: "Test payment flow",
      assignedDate: "2025-03-25",
      dueDate: "2025-03-26",
      assignedBy: "Prateek (Manager)",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      sn: 2,
      task: "Fix navbar responsiveness",
      assignedDate: "2025-03-25",
      dueDate: "2025-03-26",
      assignedBy: "Prateek (Manager)",
      priority: "Low",
      status: "Pending",
    },
  ];

  const dummyHistory = [
    {
      taskId: 1,
      action: "Task assigned to User",
      date: "2025-03-25 12:00:00",
      updatedBy: "Manager",
    },
    {
      taskId: 1,
      action: "Status changed to In Progress",
      date: "2025-03-26 14:30:00",
      updatedBy: "User",
    },
    {
      taskId: 1,
      action: "Issue reported: Payment flow does not work",
      date: "2025-03-27 10:00:00",
      updatedBy: "User",
    },
    {
      taskId: 1,
      action: "Task completed",
      date: "2025-03-28 16:00:00",
      updatedBy: "Admin",
    },
    {
      taskId: 2,
      action: "Task assigned to User",
      date: "2025-03-25 13:00:00",
      updatedBy: "Manager",
    },
    {
      taskId: 2,
      action: "Status changed to In Progress",
      date: "2025-03-26 15:00:00",
      updatedBy: "User",
    },
    {
      taskId: 2,
      action: "Issue reported: Navbar responsiveness",
      date: "2025-03-27 12:00:00",
      updatedBy: "User",
    },
    {
      taskId: 2,
      action: "Task completed",
      date: "2025-03-28 14:00:00",
      updatedBy: "Admin",
    },
    {
      taskId: 2,
      action: "Task completed",
      date: "2025-03-28 14:00:00",
      updatedBy: "Admin",
    },
    {
      taskId: 2,
      action: "Task completed",
      date: "2025-03-28 14:00:00",
      updatedBy: "Admin",
    },
  ];

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

    // const reminders = [
    //   {
    //     id: 1,
    //     title: "Weekly Meeting",
    //     message: "Don't forget the weekly team meeting at 3:00 PM.",
    //     date: "2025-03-27 02:00 PM",
    //     sender: "Manager",
    //   },
    //   {
    //     id: 2,
    //     title: "Submit Report",
    //     message: "Please submit the monthly report by the end of the day.",
    //     date: "2025-03-28 11:00 AM",
    //     sender: "Admin",
    //   },
    // ];

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

  const renderHistoryDrawer = () => (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      sx={{ width: "400px" }}
    >
      <Box p={3} className="w-[60rem]" >
        <h1 className="text-2xl font-semibold mb-5">
          Task History
        </h1>
        <Box
          sx={{
            maxHeight: "500px",
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f8f8" }}>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  S.No
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Date & Time
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Content
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Updated By
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyHistory.map((history, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                    {history.date}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                    {history.action}
                  </td>
                  <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                    {history.updatedBy || "User"} {/* Default to "User" */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Drawer>
  );

  const renderEditDrawer = () => (
    <Drawer
      anchor="right"
      open={editDrawerOpen}
      onClose={() => setEditDrawerOpen(false)}
    >
      <Box className="p-4 w-[45rem]">
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "600", color: "#333" }}
        >
          Edit Task
        </Typography>

        {/* Status Dropdown */}
        <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            label="Status"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Issue / Report Text Area */}
        <TextField
          label="Issue/Report"
          value={issueText}
          onChange={(e) => setIssueText(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{
            mb: 3,
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        />

        {/* Image Upload */}
        <Button
          variant="outlined"
          color="primary"
          component="label"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{
            mb: 2,
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            "&:hover": { backgroundColor: "#e8e8e8" },
          }}
        >
          Upload Attachments
          <input
            type="file"
            hidden
            onChange={(e) => handleImageChange(e)}
            multiple
          />
        </Button>

        {/* Display Image Previews and Captions */}
        {/* {imageUpload.length > 0 &&
            imageUpload.map((image, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  style={{ maxWidth: "100px", marginRight: "10px" }}
                />
                <Box flex={1}>
                  <TextField
                    label={`Image ${index + 1} Caption`}
                    value={imageCaptions[index]}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <IconButton onClick={() => handleDeleteImage(index)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
            ))} */}

        <Box
          sx={{
            display: "grid",
            // gridTemplateColumns: "repeat(2, fr)",
            maxHeight: "600px",
            overflowY: "auto",
            gap: 2,
          }}
        >
          {imageUpload.length > 0 &&
            imageUpload.map((image, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  style={{
                    maxWidth: "150px",
                    height: "auto",
                    marginRight: "12px",
                    borderRadius: "4px",
                  }}
                />
                <Box flex={1}>
                  <TextField
                    label={`Image ${index + 1} Caption`}
                    value={imageCaptions[index]}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderRadius: "4px",
                      backgroundColor: "#f8f8f8",
                      mb: 1,
                    }}
                  />
                </Box>
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
        </Box>

        <div className="flex items-center justify-center" >

          <UniversalButton
            onClick={handleReportIssue}
            label="Submit"
          />
        </div>

      </Box>
    </Drawer>
  );
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
            <div className="w-20 h-20 mx-auto">
              <lottie-player
                autoplay
                loop
                mode="normal"
                src="/animation/handwave.json"
                style={{ width: "100%", height: "100%" }}
              ></lottie-player>
            </div>
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-4">
                Welcome back, "Manager"
              </h1>
              <h2 className="text-lg text-gray-500">
                Here's what's happening with your workspace today.
              </h2>
            </div>
          </div>
          <Tooltip title="Notifications" arrow >
            <IconButton onClick={handleOpenNotification} className="flex gap-2" >
              <NotificationsIcon sx={{ color: "#6366f1", fontSize: "30px" }} />
              <div className="absolute -top-3 right-0">
                <Badge value="2"></Badge>
              </div>
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

      <div>
        <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-4">
          Manage Tasks
        </h1>
        <DataTable
          id="taskHistorytableManager"
          name="taskHistorytableManager"
          col={columns}
          rows={rows}
        />
      </div>

      {renderHistoryDrawer()}

      {renderEditDrawer()}

      {renderNotificationDrawer()}


    </Box>
  );
};

export default ManagerDashboard;
