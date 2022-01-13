import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TasksContext = React.createContext(null);

export default function TasksProvider ({ children }) {

    const [tasks, setTasks] = useLocalStorage("tasks", [
        { id: 0, task: "Criar um todo", isDone: false },
    ]);

    function createTask(task) {
        const newTask = {
          id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
          task,
          isDone: false,
        };

        setTasks([...tasks, newTask]);
        console.log('oh')
    };
    
    return (
        <TasksContext.Provider value={{ tasks, createTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export function useTasks() {
    const { tasks, createTask } = React.useContext(TasksContext);
    return { tasks, createTask };
};