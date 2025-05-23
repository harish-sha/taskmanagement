import {
  Box,
  FormControl,
  Select,
  Typography,
  MenuItem,
  InputLabel,
  IconButton,
  Tooltip,
  TextField,
  Drawer,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "primereact/badge";
import toast from "react-hot-toast";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AnimatedStats from "../../components/common/AnimatedStats";
import ActivityFeed from "../../components/common/ActivityFeed";
import Sidebar from "../../components/common/Sidebar";
import UniversalButton from "../../components/common/UniversalButton";
import AnimatedDropdown from "../../components/common/AnimatedDropdown";
import InputField from "../../components/common/InputField";
import { Dialog } from "primereact/dialog";
import CloseIcon from '@mui/icons-material/Close';

import { Calendar } from "primereact/calendar";



// import { DatePicker } from "@mui/x-date-pickers";

// import UniversalDatePicker from "../../components/common/UniversalDatePicker";

const ManagerDashboard = () => {
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(null);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    task: "",
    assignedDate: today,
    dueDate: "",
    assignedTo: "",
    priority: "",
  });

  const userOptions = [
    { label: "abhishek", value: "abhishek" },
    { label: "arihant", value: "arihant" },
    { label: "user 3", value: "user3" },
    { label: "user 4", value: "user4" },
  ];

  const priorityOptions = [
    { label: "high", value: "High" },
    { label: "medium", value: "Medium" },
    { label: "low", value: "Low" },
  ];

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveTask = () => {
    const { task, assignedDate, dueDate, assignedTo, priority } = newTask;
    if (!task || !assignedDate || !dueDate || !assignedTo || !priority) {
      toast.error("Please fill all fields!");
      return;
    }
   
    setTaskDialogOpen(false);
    setNewTask({
      task: "",
      assignedDate: today,
      dueDate: "",
      assignedTo: "",
      priority: "",
    });
    toast.success("Task added successfully!");
  };

  const handleOpenNotification = () => {
    setNotificationDrawerOpen(true);
  };

  const renderNotificationDrawer = () => {
    const notifications = [
      {
        id: 1,
        title: "Task Assigned",
        message:
          "You have been assigned a new task: 'Fix navbar responsiveness'.",
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
            // width: "400px",
            padding: "16px",
            backgroundColor: "#f9fafb",
          },
        }}
      >
        <Box> 
          <div className="flex items-center justify-between mb-5">
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              color: "#333",
             
            }}
          >
            Your Reminders & Notifications
          </Typography>

          <CloseIcon 
                  onClick={() => setNotificationDrawerOpen(false)}
                  sx={{color:"gray"}}
                  />
         </div>
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
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
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
                      sx={{
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "4px",
                      }}
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
                        <Typography variant="caption" sx={{ color: "#888" }}>
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
                    <div className="flex items-center justify-between">
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
                 src="/animation/handwave.json"
                 // src="https://assets3.lottiefiles.com/packages/lf20_0yfsb3a1.json"
                 style={{ width: "100%", height: "100%" }}
               ></lottie-player>
             </div>
             <div className="flex">
               <div>
               <h1 className="md:text-2xl text-lg font-semibold text-gray-700 flex items-center justify-center mb-4">
                 Welcome back, "Manager"
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

      <main className="flex mb-4 items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UniversalButton
            label="+ New Task"
            onClick={() => setTaskDialogOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow-md cursor-pointer"
          />
        </motion.div>
      </main>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AnimatedStats />
        </div>
        <ActivityFeed />
      </div>

      {renderNotificationDrawer()}

      <Dialog
        visible={taskDialogOpen}
        onHide={() => setTaskDialogOpen(false)}
        header="Assign New Task"
        style={{ width: "500px" }}
        draggable={false}
      >
        <div className="space-y-2 ">
          <InputField
            id="taskId"
            name="task"
            value={newTask.task}
            onChange={handleTaskInputChange}
            placeholder="Task"
            label="Task"
          />
          
           <div className="mb-2">
              <label htmlFor="assignedDate" className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Date
               </label>
          <Calendar
            value={newTask.assignedDate}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, assignedDate: e.value }))
            }
            minDate={new Date()}
            showIcon
            dateFormat="dd-mm-yy"
            style={{ width: "100%", marginBottom: "16px", height: "2.3rem" }}
            placeholder="Assigned date"
            label="Assigned date"
          />
         </div>


           <div className="mb-2">
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
                </label>
          <Calendar
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, dueDate: e.value }))
            }
            minDate={new Date()}
            showIcon
            dateFormat="dd-mm-yy"
            style={{ width: "100%", marginBottom: "16px", height: "2.3rem" }}
            placeholder="Due date"
          />
         </div>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <AnimatedDropdown
              id="priority"
              name="priority"
              label="Priority"
              options={priorityOptions}
              value={newTask.priority}
              onChange={(selectedValue) =>
                setNewTask((prev) => ({
                  ...prev,
                  priority: selectedValue,
                }))
              }
              placeholder="Priority"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <AnimatedDropdown
              id="assignedTo"
              name="assignedTo"
              label="Assigned To"
              options={userOptions}
              value={newTask.assignedTo}
              onChange={(selectedValue) =>
                setNewTask((prev) => ({
                  ...prev,
                  assignedTo: selectedValue,
                }))
              }
              placeholder="Assign To"
            />
          </FormControl>
          <div className=" flex items-center justify-center">
            <UniversalButton label="Assign Task" onClick={handleSaveTask} />
          </div>
        </div>
      </Dialog>
    </Box>
  );
};

export default ManagerDashboard;
