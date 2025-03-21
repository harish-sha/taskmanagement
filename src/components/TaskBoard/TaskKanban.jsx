const TaskKanban = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Assigned</h3>
                <p className="text-sm text-gray-500">[Tasks will go here]</p>
            </div>
            <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Pending</h3>
                <p className="text-sm text-gray-500">[Tasks will go here]</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">In Progress</h3>
                <p className="text-sm text-gray-500">[Tasks will go here]</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Completed</h3>
                <p className="text-sm text-gray-500">[Tasks will go here]</p>
            </div>
        </div>
    );
};

export default TaskKanban;