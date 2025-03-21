// File: components/TaskTable.jsx
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Task Name", width: 200 },
  { field: "assignedTo", headerName: "Assigned To", width: 150 },
  { field: "status", headerName: "Status", width: 130 },
];

const rows = [
  { id: 1, name: "Fix UI Bug", assignedTo: "User A", status: "Pending" },
  { id: 2, name: "Optimize DB", assignedTo: "User B", status: "In Progress" },
  { id: 3, name: "API Security", assignedTo: "User C", status: "Completed" },
];

const TaskTable = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default TaskTable;
