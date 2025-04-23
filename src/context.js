import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    let [lastId, setLastId] = useState(0);

    const addTask = (title, priority, completion = false) => {
        const newTask = {
            id: lastId++,
            title,
            priority,
            completion,
        };
        setTasks([...tasks, newTask]);
        setLastId(lastId + 1); 
    };

    const deleteTask = (id = tasks.length - 1) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext); // Custom hook 
