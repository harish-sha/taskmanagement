import React from 'react';
import { IconButton, Drawer, Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField   } from "@mui/material";

const RenderHistory = ({dummyHistory, drawerOpen, setDrawerOpen}) => {
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
}

export default RenderHistory