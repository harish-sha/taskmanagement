import {
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Tasks",
    count: 284,
    icon: <FaTasks />,
    color: "bg-blue-500",
    sub: "22 new this week",
  },
  {
    label: "Completed",
    count: 173,
    icon: <FaCheckCircle />,
    color: "bg-green-500",
    sub: "+12 today",
  },
  {
    label: "Pending",
    count: 79,
    icon: <FaHourglassHalf />,
    color: "bg-yellow-500",
    sub: "5 overdue",
  },
  {
    label: "Overdue",
    count: 32,
    icon: <FaExclamationTriangle />,
    color: "bg-red-500",
    sub: "↑ 3 since yesterday",
  },
];

const AnimatedStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className="p-5 bg-white rounded-xl shadow-lg flex items-start gap-4"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className={`text-white p-3 rounded-full ${s.color} text-xl`}>
            {s.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{s.count}</h3>
            <p className="text-sm font-medium text-gray-500">{s.label}</p>
            <span className="text-xs text-gray-400">{s.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats;
