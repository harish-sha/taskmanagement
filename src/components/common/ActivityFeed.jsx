import { motion } from "framer-motion";
import { FaUserPlus, FaCheck, FaTasks } from "react-icons/fa";

const activities = [
  { icon: <FaUserPlus />, text: "Riya added a new user", time: "2 mins ago" },
  {
    icon: <FaTasks />,
    text: "Manager assigned Task #202",
    time: "10 mins ago",
  },
  { icon: <FaCheck />, text: "Arjun completed Task #198", time: "30 mins ago" },
  {
    icon: <FaTasks />,
    text: "Admin created new task category",
    time: "1 hour ago",
  },
];

const ActivityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-md p-5 h-full"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🔔 Recent Activity
      </h3>
      <ul className="space-y-4">
        {activities.map((a, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <div className="text-blue-600 mt-1 text-lg">{a.icon}</div>
            <div>
              <p>{a.text}</p>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ActivityFeed;
