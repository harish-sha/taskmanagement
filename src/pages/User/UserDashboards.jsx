import CollaborativeEditor from "../../components/Editor/CollaborativeEditor";
import ApiDebugTool from "../../components/APITracker/ApiDebugTool";
import Sidebar from "../../components/common/Sidebar";

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
import VisibilityIcon from '@mui/icons-material/Visibility';

import AnimatedStats from "../../components/common/AnimatedStats";
import ActivityFeed from "../../components/common/ActivityFeed";
import { DataTable } from "../../components/common/DataTable";
import CustomTooltip from "../../components/common/CustomTooltip";
import { Dialog } from "primereact/dialog";



const UserDashboards = () => {

  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);










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

  const handleView = (row) => {
    setSelectedRow(row);
    setDialogVisible(true);
  };

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((e) => e.title.includes(`(${filter})`));

  const columns = [
    { field: 'sn', headerName: 'S.No', flex: 0, minWidth: 80 },
    { field: 'task', headerName: 'Tasks', flex: 1, minWidth: 120 },
    { field: 'assignedDate', headerName: 'Assigned Date', flex: 1, minWidth: 120 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1, minWidth: 120 },
    { field: 'assignedBy', headerName: 'Assigned By', flex: 1, minWidth: 120 },
    { field: 'priority', headerName: 'Priority', flex: 1, minWidth: 120 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
    // { field: 'View', headerName: 'View', flex: 1, minWidth: 120 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip
            title="View"
            placement="top"
            arrow
          >
            <IconButton className='text-xs' onClick={() => handleView(params.row)}>
              <VisibilityIcon
                sx={{
                  fontSize: '1.2rem',
                  color: 'green'
                }}
              />
            </IconButton>
          </CustomTooltip>
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
      // action: "True",
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
      // view: "True",
    },
  ]

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f8fafc">
      <Sidebar role="user" />
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
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-20 mx-auto">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  // src="https://assets3.lottiefiles.com/packages/lf20_0yfsb3a1.json"
                  src='/animation/handwave.json'
                  style={{ width: "100%", height: "100%" }}
                ></lottie-player>
              </div>
              <div className="" >
                <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-4">
                  Welcome back, "Arihant"
                </h1>
                <h2 className="text-lg text-gray-500">
                  Here's what's happening with your workspace today.
                </h2>
              </div>
            </div>
            <Tooltip title="Notifications">
              <IconButton>
                <NotificationsIcon sx={{ color: "#6366f1" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
          <div className="lg:col-span-3">
            <AnimatedStats />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-4">
            Manage Tasks
          </h1>
          <DataTable
            id="transactionshistorytable"
            name="transactionshistorytable"
            col={columns}
            rows={rows}
          />
        </div>



        <Dialog
          header="Task Details"
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
          className="w-[30rem]"
          draggable={false}
        >
        </Dialog>


      </Box>
    </Box>
  );
};

export default UserDashboards;
