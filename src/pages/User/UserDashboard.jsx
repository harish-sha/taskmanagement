import CollaborativeEditor from "../../components/Editor/CollaborativeEditor";
import ApiDebugTool from "../../components/APITracker/ApiDebugTool";

const UserDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-6 col-span-2">
          <h2 className="font-semibold text-lg mb-4">My Tasks</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span>🔧 Fix navbar responsiveness</span>
              <span className="text-xs text-gray-500">Due: 2025-03-25</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>🧪 Test payment flow</span>
              <span className="text-xs text-gray-500">Due: 2025-03-26</span>
            </li>
          </ul>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="font-semibold text-lg mb-4">Report an Issue</h2>
          <label className="text-sm font-medium">Task Reference</label>
          <input
            className="w-full border rounded p-2 mb-2 text-sm"
            placeholder="Related task title or ID"
          />

          <label className="text-sm font-medium">Code Snippet / Logs</label>
          <textarea
            className="w-full border rounded p-2 text-sm h-28 mb-2"
            placeholder="Paste error logs or code..."
          />

          <label className="text-sm font-medium">Describe the Issue</label>
          <textarea
            className="w-full border rounded p-2 text-sm h-20 mb-2"
            placeholder="What happened?"
          />

          <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Submit Report
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="font-semibold text-lg mb-4">Resolved Issues</h2>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>[2025-03-19] Navbar bug - ✅ Fixed by DevOps</li>
          <li>[2025-03-18] API timeout - ✅ Handled with retry logic</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <CollaborativeEditor />
        <ApiDebugTool />
      </div>
    </div>
  );
};

export default UserDashboard;
