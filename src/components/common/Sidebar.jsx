// File: components/Sidebar.jsx
import { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ role = 'admin' }) => {

  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, roles: ['admin', 'manager'], route: '/dashboard' },
    { label: 'Tasks', icon: <TaskIcon />, roles: ['admin', 'manager', 'user'], route: '/tasks' },
    { label: 'Calendar', icon: <CalendarTodayIcon />, roles: ['admin', 'manager', 'user'], route: '/calendar' },
    { label: 'Users', icon: <PeopleIcon />, roles: ['admin'], route: '/users' },
    { label: 'Analytics', icon: <InsightsIcon />, roles: ['admin'], route: '/analytics' },
    {
      label: 'Notifications',
      icon: <NotificationsIcon />,
      roles: ['admin', 'manager'],
      route: '/notifications',
      subRoutes: [
        { label: 'Email', route: '/notifications/email' },
        { label: 'SMS', route: '/notifications/sms' },
        { label: 'Push', route: '/notifications/push' }
      ]
    },
    { label: 'Settings', icon: <SettingsIcon />, roles: ['admin'], route: '/settings' },
    { label: 'Help', icon: <HelpOutlineIcon />, roles: ['admin', 'manager', 'user'], route: '/help' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 72,
          boxSizing: 'border-box',
          backgroundColor: '#1f2937',
          color: '#ffffff',
        },
      }}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          textAlign: 'center',
          padding: '16px 0',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#ffffff',
        }}
      >
        <AssignmentOutlinedIcon />
      </Typography>
      <Divider sx={{ borderColor: '#374151' }} />
      <List>
        {navItems
          .filter(item => item.roles.includes(role))
          .map((item, index) => (
            <Tooltip
              title={
                item.subRoutes
                  ? (
                    <div>
                      {item.subRoutes.map((sub, i) => (
                        <div key={i} style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => navigate(sub.route)}>
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )
                  : item.label
              }
              placement="right"
              arrow
              key={index}
            >
              <ListItem
                button
                onClick={() => item.route && navigate(item.route)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '12px 0',
                  '&:hover': {
                    backgroundColor: '#374151',
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#ffffff', justifyContent: 'center' }}>
                  {item.icon}
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
