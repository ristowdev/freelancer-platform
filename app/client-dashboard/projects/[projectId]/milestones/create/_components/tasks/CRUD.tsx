// components/TasksCRUD.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Delete, Edit } from 'lucide-react';
import React, { useState } from 'react';
import { z } from 'zod';

// Define the task schema
const TaskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Task name is required"),
});

type Task = z.infer<typeof TaskSchema>;

interface TasksCRUDProps {
  onChange: (tasks: Task[]) => void;
}

const TasksCRUD: React.FC<TasksCRUDProps> = ({ onChange }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>('');

  const handleAddTask = () => {
    if (!taskName) return;
    const newTask: Task = { id: Date.now().toString(), name: taskName };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    onChange(updatedTasks);
    setTaskName('');
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    onChange(updatedTasks);
  };

  const handleEditTask = (id: string, name: string) => {
    setEditTaskId(id);
    setEditTaskName(name);
  };

  const handleUpdateTask = () => {
    if (!editTaskName) return;
    const updatedTasks = tasks.map(task =>
      task.id === editTaskId ? { ...task, name: editTaskName } : task
    );
    setTasks(updatedTasks);
    onChange(updatedTasks);
    setEditTaskId(null);
    setEditTaskName('');
  };

  return (
    <div>
        <span className='text-sm'>Add new task</span>
        <div className='flex items-center mb-[10px] mt-[10px]'>
            <Input
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Button type="button" onClick={handleAddTask} className="bg-slate-200 text-black hover:text-white ml-[10px]">Add Task</Button>
        </div>
        <ul>
            {tasks.map(task => (
            <li key={task.id}>
                {editTaskId === task.id ? (
                <div className='flex items-center mb-[10px]'>
                    <Input
                        value={editTaskName}
                        onChange={(e) => setEditTaskName(e.target.value)}
                    />
                    <Button type="button" onClick={handleUpdateTask} className='ml-[10px] mr-[10px] bg-slate-200 text-black hover:text-white'>Save</Button>
                    <Button type="button" onClick={() => setEditTaskId(null)} className="bg-slate-200 text-black hover:text-white">Cancel</Button>
                </div>
                ) : (
                <div className='flex items-center mb-[10px]'>
                    <Input
                        value={task.name}
                        readOnly
                    />
                    <Button 
                        type="button" 
                        onClick={() => handleEditTask(task.id, task.name)}  
                        className='ml-[10px] mr-[10px] bg-slate-200 text-black hover:text-white'
                    >
                        Edit
                    </Button>
                    <Button 
                        type="button" 
                        onClick={() => handleDeleteTask(task.id)} 
                        className="bg-slate-200 text-black hover:text-white"
                    >
                        Delete
                    </Button>
                </div>
                )}
            </li>
            ))}
        </ul>
    </div>
  );
};

export default TasksCRUD;
