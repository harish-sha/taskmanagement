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
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ role = 'admin' }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, roles: ['admin', 'manager'] },
    { label: 'Tasks', icon: <TaskIcon />, roles: ['admin', 'manager', 'user'] },
    { label: 'Calendar', icon: <CalendarTodayIcon />, roles: ['admin', 'manager', 'user'] },
    { label: 'Users', icon: <PeopleIcon />, roles: ['admin'] },
    { label: 'Analytics', icon: <InsightsIcon />, roles: ['admin'] },
    { label: 'Notifications', icon: <NotificationsIcon />, roles: ['admin', 'manager'] },
    { label: 'Settings', icon: <SettingsIcon />, roles: ['admin'] },
    { label: 'Help', icon: <HelpOutlineIcon />, roles: ['admin', 'manager', 'user'] }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 72 : 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 72 : 260,
          boxSizing: 'border-box',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          transition: 'width 0.3s ease'
        },
      }}
    >
      <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <Typography variant="h6" noWrap component="div">
            Task Manager
          </Typography>
        )}
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Divider sx={{ borderColor: '#374151' }} />
      <List>
        {navItems
          .filter(item => item.roles.includes(role))
          .map((item, index) => (
            <Tooltip title={collapsed ? item.label : ''} placement="right" key={index}>
              <ListItem button>
                <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                {!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ListItemText primary={item.label} />
                </motion.div>}
              </ListItem>
            </Tooltip>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
