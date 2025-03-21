import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Pending", "In Progress", "Completed"],
  datasets: [
    {
      label: "Tasks",
      data: [10, 5, 15],
      backgroundColor: ["#fca5a5", "#facc15", "#4ade80"],
    },
  ],
};

const DashboardChart = () => {
  return <Bar data={data} />;
};

export default DashboardChart;
