import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

const TaskModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [assignee, setAssignee] = useState(initialData.assignee || null);
  const [datetime, setDatetime] = useState(initialData.date ? new Date(initialData.date) : null);

  const assigneeOptions = [
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' }
  ];

  const handleSubmit = () => {
    if (!title || !assignee || !datetime) return;
    onSave({
      title,
      assignee,
      date: datetime.toISOString().split('T')[0]
    });
    onClose();
  };

  const footerContent = (
    <div className="flex justify-center gap-4">
      <Button label="Cancel" severity="secondary" onClick={onClose} />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit} disabled={!title || !assignee || !datetime} />
    </div>
  );

  return (
    <Dialog header="Create New Task" visible={isOpen} onHide={onClose} footer={footerContent} className="w-full max-w-lg">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Task Name</label>
          <InputText value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" placeholder="Enter task title" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Select Date & Time</label>
          <Calendar value={datetime} onChange={(e) => setDatetime(e.value)} showTime hourFormat="24" className="w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Assign To</label>
          <Dropdown value={assignee} options={assigneeOptions} onChange={(e) => setAssignee(e.value)} placeholder="Select user" className="w-full" />
        </div>
      </div>
    </Dialog>
  );
};

export default TaskModal;