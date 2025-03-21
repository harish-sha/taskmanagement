import TaskKanban from '../components/TaskBoard/TaskKanban';
import TaskCalendar from '../components/TaskBoard/TaskCalendar';

const TaskBoardPage = () => {
    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <TaskCalendar />
            <TaskKanban />
        </div>
    );
};

export default TaskBoardPage;