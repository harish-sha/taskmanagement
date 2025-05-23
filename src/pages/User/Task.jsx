import React, { useState } from 'react'
import { DataTable } from "../../components/common/DataTable";
import CustomTooltip from "../../components/common/CustomTooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Drawer, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UniversalButton from '../../components/common/UniversalButton';

import { PiMicrosoftExcelLogo } from "react-icons/pi";
import CloseIcon from '@mui/icons-material/Close';

const Task = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [selectedRow, setSelectedRow] = useState(null);
  const [issueText, setIssueText] = useState("");
  const [taskIdForIssue, setTaskIdForIssue] = useState(null);
  const [imageUpload, setImageUpload] = useState([]);


const [uploadedFiles, setUploadedFiles] = useState([]);
const [imageCaptions, setImageCaptions] = useState([]);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setTaskStatus(row.status); 
    setEditDrawerOpen(true); 
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setTaskIdForIssue(row.id);
    setDrawerOpen(true);
  };


const handleReportIssue = () => {
  const newIssue = {
    taskId: selectedRow.id,
    issue: issueText,
    reportedBy: "User",
    status: "Open",
    reportedAt: new Date().toLocaleString(),
    files: uploadedFiles,
    captions: imageCaptions,
  };

  setTaskHistory((prevHistory) => [
    ...prevHistory,
    {
      taskId: taskIdForIssue,
      action: `Issue reported: ${issueText}`,
      files: uploadedFiles,
      date: new Date().toLocaleString(),
    },
  ]);

  setIssueText("");
  setUploadedFiles([]);
  setImageCaptions([]);
  setEditDrawerOpen(false);
  toast.success("Issue reported successfully!");
};


  // const handleReportIssue = () => {
  //   const newIssue = {
  //     taskId: selectedRow.id,
  //     issue: issueText,
  //     reportedBy: "User",
  //     status: "Open",
  //     reportedAt: new Date().toLocaleString(),
  //     images: imageUpload,
  //     captions: imageCaptions,
  //   };

  //   setTaskHistory((prevHistory) => [
  //     ...prevHistory,
  //     {
  //       taskId: taskIdForIssue,
  //       action: `Issue reported: ${issueText}`,
  //       image: imageUpload,
  //       date: new Date().toLocaleString(),
  //     },
  //   ]);

  //   setIssueText("");
  //   setImageUpload([]);
  //   setImageCaptions([]);
  //   setEditDrawerOpen(false);
  //   toast.success("Issue reported successfully!");
  // };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImageUploads = [...imageUpload, ...files];
  //   const newImageCaptions = [...imageCaptions, ...files.map(() => "")];

  //   setImageUpload(newImageUploads);
  //   setImageCaptions(newImageCaptions);
  // };


const handleImageChange = (e) => {
  const files = e.target.files;
  if (files) {
    const newFiles = Array.from(files).map(file => ({
      file,
      type: file.type,
      name: file.name
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
    setImageCaptions([...imageCaptions, ...Array(files.length).fill("")]);
  }
};

const handleDeleteFile = (index) => {
  const newFiles = [...uploadedFiles];
  newFiles.splice(index, 1);
  setUploadedFiles(newFiles);

  const newCaptions = [...imageCaptions];
  newCaptions.splice(index, 1);
  setImageCaptions(newCaptions);
};


const handleCaptionChange = (index, value) => {
  const newCaptions = [...imageCaptions];
  newCaptions[index] = value;
  setImageCaptions(newCaptions);
};

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
        {/* <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "600", color: "#333" }}
        >
          Edit Task
        </Typography> */}

      <div className="flex items-center justify-between mb-5">
  <Typography
    variant="h6"
    sx={{ fontWeight: "600", color: "#333" }}
  >
    Edit Task
  </Typography>
  <CloseIcon 
    onClick={() => setEditDrawerOpen(false)}
    sx={{color:"gray", cursor: "pointer"}}
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
            <MenuItem value="OverDue">OverDue</MenuItem>
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
        {/* <Button
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
        </Button> */}


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
    accept="image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.xls,.xlsx"
  />
</Button>

{/* 
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
        </Box> */}


<Box
  sx={{
    display: "grid",
    maxHeight: "600px",
    overflowY: "auto",
    gap: 2,
  }}
>
  {uploadedFiles.length > 0 &&
    uploadedFiles.map((fileData, index) => (
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
        {fileData.type.startsWith('image/') ? (
          // Image preview
          <img
            src={URL.createObjectURL(fileData.file)}
            alt={`Preview ${index + 1}`}
            style={{
              maxWidth: "150px",
              height: "auto",
              marginRight: "12px",
              borderRadius: "4px",
            }}
          />
        ) : (
          // Excel file preview
          <div className="flex items-center flex-col gap-2" style={{ marginRight: "12px" }}>
            <PiMicrosoftExcelLogo size={40} color="#217346" />
            <span className="text-sm text-green-700 font-semibold">{fileData.name}</span>
          </div>
        )}
        <Box flex={1}>
          <TextField
            label={`Caption`}
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
          onClick={() => handleDeleteFile(index)}
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
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-700 flex items-center justify-center mb-4 mt-10">
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

    </div>
  )
}

export default Task