import React from 'react';
import { IconButton, Drawer, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const RenderHistory = ({ dummyHistory, drawerOpen, setDrawerOpen }) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: "400px" }}
      >
        <Box
          p={3}
          className="md:w-[45rem] lg:w-[60rem] w-screen"
          position="relative"
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 8,
              color: 'gray',
              zIndex: 1500,
            }}
            aria-label="close drawer"
            size="large"
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>

          <Typography variant="h5" fontWeight="600" mb={3}>
            Task History
          </Typography>

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
                  <th
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
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
                      {history.updatedBy || "User"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default RenderHistory;