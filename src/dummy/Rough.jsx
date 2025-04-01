import { useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Import AuthContext for logout functionality
import { toast } from "react-toastify";

const Sidebar = ({ role = "admin", user = { username: "Admin", role: "admin" } }) => {
  const [open, setOpen] = useState(false); // Sidebar state
  const [selected, setSelected] = useState("Dashboard");
  const [profileDialogOpen, setProfileDialogOpen] = useState(false); // Profile dialog state
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: FiHome, roles: ["admin", "manager"], route: "/dashboard" },
    { label: "Tasks", icon: FiTag, roles: ["admin", "manager", "user"], route: "/tasks" },
    { label: "Calendar", icon: FiMonitor, roles: ["admin", "manager", "user"], route: "/calendar" },
    { label: "Users", icon: FiUsers, roles: ["admin"], route: "/admin/manageroles" },
    { label: "Analytics", icon: FiBarChart, roles: ["admin"], route: "/analytics" },
    {
      label: "Products",
      icon: FiShoppingCart,
      roles: ["admin", "manager"],
      dropdownItems: [
        { label: "Add Product", route: "/products/add" },
        { label: "Manage Products", route: "/products/manage" },
        { label: "Product Categories", route: "/products/categories" },
      ],
    },
  ];

  const handleLogout = () => {
    logout(); // Call the logout function
    toast.success("You have successfully logged out!", { position: "top-right" }); // Show toast notification
  };

  return (
    <>
      {/* Sidebar */}
      <motion.nav
        layout
        className={`sticky top-0 left-0 h-screen z-50 shrink-0 border-r border-slate-300 bg-white p-2`}
        style={{
          width: open ? "225px" : "72px", // Adjust width based on state
          transition: "width 0.3s ease", // Smooth transition
        }}
      >
        <TitleSection
          open={open}
          role={role}
          user={user}
          setProfileDialogOpen={setProfileDialogOpen} // Pass the state setter
        />
        <ToggleClose open={open} setOpen={setOpen} />

        <div className="space-y-1">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item, index) => (
              <Option
                key={index}
                Icon={item.icon}
                title={item.label}
                selected={selected}
                setSelected={setSelected}
                open={open}
                notifs={item.notifs}
                dropdownItems={item.dropdownItems}
                navigate={navigate}
                route={item.route}
              />
            ))}
        </div>
      </motion.nav>

      {/* Profile Dialog */}
      <Dialog
        visible={profileDialogOpen}
        onHide={() => setProfileDialogOpen(false)} // Close the dialog
        header="Profile"
        style={{ width: "300px" }}
      >
        <Box>
          <Typography variant="body1">
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Typography>
          <Box mt={2} textAlign="right">
            <Button
              variant="contained"
              color="error"
              startIcon={<FiLogOut />}
              onClick={handleLogout} // Logout button
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

const TitleSection = ({ open, role, user, setProfileDialogOpen }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">Task Manager</span>
              <span className="block text-xs text-slate-500">
                {role.charAt(0).toUpperCase() + role.slice(1)} Panel
              </span>
            </motion.div>
          )}
        </div>
        {open && (
          <FiUser
            className="mr-2 cursor-pointer"
            onClick={() => setProfileDialogOpen(true)} // Open the profile dialog
          />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <img src="/images/celifav.png" alt="" width="40" height="40" />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div layout className="grid size-10 place-content-center text-lg">
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs, dropdownItems, navigate, route }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setSelected(title);
    if (dropdownItems) {
      setDropdownOpen((prev) => !prev);
    } else if (route) {
      navigate(route); // Navigate to the route if no dropdown
    }
  };

  return (
    <motion.div layout className="relative">
      <motion.button
        layout
        onClick={handleClick}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"
          }`}
      >
        <motion.div layout className="grid h-full w-10 place-content-center text-lg">
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;