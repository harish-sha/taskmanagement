import React, {useState} from 'react'
import { DataTable } from '../../components/common/DataTable';
import { IconButton, Drawer, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField   } from "@mui/material";
import CustomTooltip from "../../components/common/CustomTooltip";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/joy';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UniversalButton from "../../components/common/UniversalButton";
import CreateUser from '../../components/UserModel/CreateUser';
import AssignTask from '../../components/UserModel/AssignTask';
import RenderHistory from '../../components/Miscellaneous/RenderHistory';
import toast from 'react-hot-toast';

const Tasks = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [userEditDrawerOpen, setUserEditDrawerOpen] = useState(false);
    const [taskStatus, setTaskStatus] = useState("Pending");
    const [issueText, setIssueText] = useState("");
    const [imageUpload, setImageUpload] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [taskIdForIssue, setTaskIdForIssue] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [assignUser, setAssignUser] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [imageCaptions, setImageCaptions] = useState([]);
    const [openCreateUser, setOpenCreateUser] = useState(false)
    const [assignTask, setAssignTask] = useState(false)
    

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

  const handleDeleteTask = () => {
    toast.success("You have deleted the task")
  }

  const handleSubmit = () => {
    // Submit the updated user details logic
    console.log("User Details Updated", { userName, userEmail, userRole, imageUpload, imageCaptions });
  };


      const handleEditTask = (row) => {
        setSelectedRow(row);
        setTaskStatus(row.status); // Set initial task status
        setEditDrawerOpen(true); // Open the edit drawer
      };
    
      const handleView = (row) => {
        setSelectedRow(row);
        setTaskIdForIssue(row.id);
        setDrawerOpen(true);
      };

      const handleDeleteAllTasks = () => {
        toast.success("All tasks deleted 😮")
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

      const TaskColumns = [
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
                    onClick={() => handleEditTask(params.row)}
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
      
        const TaskRows = [
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
        <>
        <div className='flex flex-col gap-4'>
        <div className='text-2xl font-semibold flex justify-between items-center mb-4 '>
            <h1>Manage Tasks</h1>
            <div className='flex gap-2'>
            <Button onClick={()=>setAssignTask(true)}>Assign Task </Button>
            <Button onClick={handleDeleteAllTasks}>Delete All Tasks</Button>
            </div>
        </div>

        <div>
        {/* <h1 className="text-xl font-semibold text-gray-700 flex items-center justify-start mb-4 underline">
          Manage Tasks
        </h1> */}
        <DataTable
          id="taskHistorytableManager"
          name="taskHistorytableManager"
          col={TaskColumns}
          rows={TaskRows}
        />
        </div>
        </div>

        {/* {renderHistoryDrawer()} */}
        {<RenderHistory 
        dummyHistory={dummyHistory}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        />}


        {renderEditDrawer()}

        {
            <AssignTask 
            setAssignTask={setAssignTask}
            assignTask={assignTask}/>
        }
        </>
    )
}

export default Tasks