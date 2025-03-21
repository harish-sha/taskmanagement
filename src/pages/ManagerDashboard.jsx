const ManagerDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2 className="font-semibold text-lg mb-2">Assign Users</h2>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Assign New User</button>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="font-semibold text-lg mb-2">My Team</h2>
          <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
            <li>User A - 3 Tasks</li>
            <li>User B - 5 Tasks</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="font-semibold text-lg mb-2">Activity Feed</h2>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✅ User A completed 'Fix header bug'</li>
            <li>⏳ User B started 'API integration'</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
