import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import ShieldIcon from "@mui/icons-material/Shield";
import toast from "react-hot-toast";

const UserProfile = ({ profileDialogOpen, setProfileDialogOpen, userData }) => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(userData);
  const [formData, setFormData] = useState(userData);
  const [profilePic, setProfilePic] = useState(userData.profilePic || null);
  const [previewPic, setPreviewPic] = useState(userData.profilePic || null);

  const handleClose = () => {
    setProfileDialogOpen(false);
    setEditMode(false);
    setFormData(user);
    setPreviewPic(user.profilePic || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser({ ...formData, profilePic: previewPic });
    setProfilePic(previewPic);
    setEditMode(false);
    toast.success("Your profile updated 🎉👍");

    // Optional: Upload image to backend/server here
    // You can use FormData to send `previewPic` as file if needed
  };

  const handleCancel = () => {
    setFormData(user);
    setPreviewPic(profilePic);
    setEditMode(false);
  };

  return (
    <Dialog open={profileDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        User Profile
        <IconButton
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[600],
            transition: "0.3s",
            "&:hover": { color: "error.main", transform: "scale(1.2)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            textAlign: "center",
            background: "linear-gradient(to bottom right, #ffffff, #f0f0f5)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
            <Avatar
              src={previewPic}
              sx={{
                bgcolor: deepPurple[500],
                width: 90,
                height: 90,
                fontSize: 34,
                mx: "auto",
              }}
            >
              {!previewPic && user.username.charAt(0).toUpperCase()}
            </Avatar>

            {editMode && (
               <>
                <input
                  accept="image/*"
                  type="file"
                  id="upload-profile-pic"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
                <label htmlFor="upload-profile-pic">
                  <IconButton
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#fff",
                      boxShadow: 1,
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  size="small"
                            >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-7c-.5 0-1 .3-1.3.8L9.2 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-4.2l-1.5-2.2C13 2.3 12.5 2 12 2zm0 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                  </svg>

                </IconButton>
              </label>
            </>
            )}

            {/* <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                border: "2px solid white",
              }}
            /> */}
          </Box>

          {editMode ? (
            <>
              <TextField
                label="Username"
                name="username"
                fullWidth
                margin="normal"
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {user.username}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
                mb={1}
              >
                <EmailIcon fontSize="small" /> {user.email || "john@email.com"}
              </Typography>
            </>
          )}

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                <ShieldIcon fontSize="small" sx={{ mr: 0.5 }} />
                Role
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Member Since
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                Jan 2023
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {editMode ? (
            <Box display="flex" gap={2} justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                px: 4,
                py: 1.2,
                fontWeight: 500,
                fontSize: "0.95rem",
                backgroundColor: deepPurple[500],
                "&:hover": {
                  backgroundColor: deepPurple[700],
                },
              }}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
