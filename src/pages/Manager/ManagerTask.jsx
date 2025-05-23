import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "../../components/common/DataTable";
import CustomTooltip from "../../components/common/CustomTooltip";
import UniversalButton from "../../components/common/UniversalButton";
import { IconButton } from "@mui/material";
import {
  Drawer,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import toast from "react-hot-toast";
import { color } from "framer-motion";
import AnimatedDropdown from "../../components/common/AnimatedDropdown";
import InputField from "../../components/common/InputField";
import { Calendar } from "primereact/calendar";
import CloseIcon from '@mui/icons-material/Close';


const ManagerTask = () => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [historydrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("Pending");

  const [imageUpload, setImageUpload] = useState([]);
  const [issueText, setIssueText] = useState("");
    const [imageCaptions, setImageCaptions] = useState([]);



  // New state for tasks
  const [rows, setRows] = useState([
    {
      id: 1,
      sn: 1,
      task: "Test payment flow",
      assignedDate: "2025-03-25",
      dueDate: "2025-03-26",
      assignedBy: "Prateek (Manager)",
      assignedTo: "abhishek",
      priority: "High",
      status: "Pending",
    },
  ]);

  const today = new Date().toISOString().split("T")[0];
  // New Task Dialog fields
  const [newTask, setNewTask] = useState({
    task: "",
    assignedDate: today,
    dueDate: "",
    assignedTo: "",
  });

  // Dummy user list for dropdown
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
    { field: "assignedTo", headerName: "Assigned To", flex: 1, minWidth: 120 },
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
           <CustomTooltip title="Delete Task" placement="top" arrow>
                  <IconButton
                    className="text-xs"
                    onClick={() => handleDeleteTask(params.row)}
                  >
                    <DeleteIcon sx={{ fontSize: "1.2rem", color: "red" }} />
                  </IconButton>
                </CustomTooltip>
        </>
      ),
    },
  ];

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new task
  const handleSaveTask = () => {
    const { task, assignedDate, dueDate, assignedTo } = newTask;
    if (!task || !assignedDate || !dueDate || !assignedTo) {
      toast.error("Please fill all fields!");
      return;
    }
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    setRows([
      ...rows,
      {
        id: newId,
        sn: newId,
        task,
        assignedDate,
        dueDate,
        assignedBy: "Manager",
        assignedTo,
        priority: "Medium",
        status: "Pending",
      },
    ]);
    setTaskDialogOpen(false);
    setNewTask({ task: "", assignedDate: "", dueDate: "", assignedTo: "" });
    toast.success("Task added successfully!");
  };


  const handleDeleteTask = () => {
    toast.success("You have deleted the task")
  }


    const handleDeleteAllTasks = () => {
        toast.success("All tasks deleted")
      }


    const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImageUpload([...imageUpload, ...files]);
    }
  };


  const handleCaptionChange = (index, value) => {
    const newCaptions = [...imageCaptions];
    newCaptions[index] = value;
    setImageCaptions(newCaptions);
  };


  const handleDeleteImage = (index) => {
    const newImages = [...imageUpload];
    newImages.splice(index, 1);
    setImageUpload(newImages);

    const newCaptions = [...imageCaptions];
    newCaptions.splice(index, 1);
    setImageCaptions(newCaptions);
  };

  // const rows = [
  //   {
  //     id: 1,
  //     sn: 1,
  //     task: "Test payment flow",
  //     assignedDate: "2025-03-25",
  //     dueDate: "2025-03-26",
  //     assignedBy: "Prateek (Manager)",
  //     assignedTo: "abhishek",
  //     priority: "High",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     sn: 2,
  //     task: "Fix navbar responsiveness",
  //     assignedDate: "2025-03-25",
  //     dueDate: "2025-03-26",
  //     assignedBy: "Prateek (Manager)",
  //     assignedTo: "arihant",
  //     priority: "Low",
  //     status: "Pending",
  //   },
  // ];

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

  const renderHistoryDrawer = () => (
    <Drawer
      anchor="right"
      open={historydrawerOpen}
      onClose={() => setHistoryDrawerOpen(false)}
      // sx={{ width: "100px" }}
    >
      <Box p={3} className="w-screen md:w-[45rem] lg:w-[60rem]">
        <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold ">Task History</h1>
        <CloseIcon 
        onClick={() => setHistoryDrawerOpen(false)}
        sx={{
          color:"gray"
        }}
        />
        </div>
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
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {history.date}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
                    {history.action}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                  >
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
      <Box p={3} className="w-screen md:w-[35rem] lg:w-[60rem]">
       <div className="flex items-center justify-between mb-5">
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "#333" }}
        >
          Edit Task
        </Typography>

        <CloseIcon 
        onClick={() => setEditDrawerOpen(false)}
        sx={{color:"gray"}}
        />
</div>
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

        <div className="flex items-center justify-center">
          <UniversalButton onClick={handleReportIssue} label="Submit" />
        </div>
      </Box>
    </Drawer>
  );

  const handleView = () => {
    setHistoryDrawerOpen(true);
  };

  const handleEdit = () => {
    setEditDrawerOpen(true);
  };

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

  return (
    <>

    <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl">Tasks</h1>
      <div className="flex justify-center md:justify-end  gap-2 ">
        <UniversalButton
        label="+ New Task"
          onClick={() => setTaskDialogOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium shadow-md cursor-pointer"
        />
          
       

        <UniversalButton
          label="Delete All Tasks"
          onClick={handleDeleteAllTasks}
          variant="danger"
        />
      </div>
</div>

      <Dialog
        visible={taskDialogOpen}
        onHide={() => setTaskDialogOpen(false)} // Close the dialog
        header="Assign New Task"
        style={{ width: "500px" }}
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
    placeholder="Assigned Date"
    style={{ width: "100%", marginBottom: "16px" , height:"2.3rem" }}
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
    placeholder="Due Date"
    style={{ width: "100%", marginBottom: "16px" , height:"2.3rem"}}
  />
</div>
          <FormControl fullWidth sx={{ mb: 2 }}>
           

               <AnimatedDropdown
      id="priority"
      name="priority"
      options={priorityOptions}
      value={newTask.priority}
      onChange={(selectedValue) =>
        setNewTask((prev) => ({
          ...prev,
          priority: selectedValue,
        }))
      }
      placeholder="Priority"
      label="Priority"
    />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
           

             <AnimatedDropdown
      id="assignedTo"
      name="assignedTo"
      options={userOptions}
      value={newTask.assignedTo}
      onChange={(selectedValue) =>
        setNewTask((prev) => ({
          ...prev,
          assignedTo: selectedValue,
        }))
      }
      placeholder="Assign To"
      label="Assign To"
    />
          </FormControl>
         
           <div className=" flex items-center justify-center">
              <UniversalButton label="Assign Task" onClick={handleSaveTask} />
              </div>
        </div>
      </Dialog>

      <div className="mt-8">
        <DataTable
          id="taskHistorytableManager"
          name="taskHistorytableManager"
          col={columns}
          rows={rows}
        />
      </div>

      {renderHistoryDrawer()}
      {renderEditDrawer()}
    </>
  );
};

export default ManagerTask;
