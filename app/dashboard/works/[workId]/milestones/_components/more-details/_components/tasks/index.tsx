import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { SquareCheckBig } from "lucide-react";
import { useState, useMemo } from "react";
import clsx from "clsx";
import DoneProgress from "./done-progress";

interface Task {
    _id: string;
    name: string;
    done: boolean;
}

interface TasksProps {
    tasks: Task[];
}

const Tasks = ({ tasks }: TasksProps) => {
    const [taskList, setTaskList] = useState(tasks);
    const [disabledCheckboxId, setDisabledCheckboxId] = useState<string | null>(null);

    const { mutate: updateTask, pending } = useApiMutation(api.milestones.updateTask);

    const handleCheckboxChange = (taskId: string, currentDoneStatus: boolean) => {
        const newDoneStatus = !currentDoneStatus;

        updateTask({ taskId, done: newDoneStatus })
            .then(() => {
                // Successfully updated task
            })
            .catch((e) => {
                // Handle error
            });

        setTaskList((prevTaskList) =>
            prevTaskList.map((task) =>
                task._id === taskId ? { ...task, done: newDoneStatus } : task
            )
        );

        // Disable the clicked checkbox
        setDisabledCheckboxId(taskId);
    };

    return (
        <div className="mt-[20px] border-t border-[#EAEAEA] pt-[20px]">
            <div className="flex items-center">
                <SquareCheckBig size={18} color="#172B4D" />
                <span className="text-base font-semibold text-[#172B4D] ml-[5px]">Tasks</span>
            </div>
            <DoneProgress tasks={taskList} />
            <div className="mt-[15px]">
                {taskList.map((task) => (
                    <div className="flex items-start mb-[15px]" key={task._id}>
                        <Checkbox
                            className="w-[16px] h-[16px] mt-[1.5px]"
                            id={`cb-${task._id}`}
                            checked={task.done}
                            onCheckedChange={() => handleCheckboxChange(task._id, task.done)}
                            disabled={pending && task._id === disabledCheckboxId}
                        />
                        <label
                            className="text-sm ml-[8px] cursor-pointer text-[#172B4D]"
                            htmlFor={`cb-${task._id}`}
                        >
                            {task.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
