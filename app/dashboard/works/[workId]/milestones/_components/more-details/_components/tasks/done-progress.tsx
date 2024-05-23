import { useMemo } from "react";
import clsx from "clsx";

interface Task {
    _id: string;
    name: string;
    done: boolean;
}

interface DoneProgressProps {
    tasks: Task[];
}

const DoneProgress = ({ tasks }: DoneProgressProps) => {
    const completedTasksCount = useMemo(
        () => tasks.filter((task) => task.done).length,
        [tasks]
    );
    const totalTasksCount = tasks.length;
    const completedPercentage = (completedTasksCount / totalTasksCount) * 100;

    return (
        <div className="mt-[10px] w-full flex items-center">
            <span className="text-xs text-[#44546f]">{completedPercentage.toFixed(0)}%</span>
            <div className="w-full h-[8px] rounded-full bg-[#e4e6ea] relative ml-[8px]">
                <div
                    className={clsx(
                        "absolute top-0 left-0 h-[8px] flex items-center justify-center transition-all duration-200",
                        {
                            "rounded-full bg-green-500": completedPercentage >= 100,
                            "rounded-l-full bg-[#579dff]": completedPercentage < 100,
                        }
                    )}
                    style={{ width: `${completedPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default DoneProgress;
