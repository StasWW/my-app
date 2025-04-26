import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]); //Создаем хук, tasks - данные в state, setTasks - setter функция
    let [lastId, setLastId] = useState(0);

    const addTask = (title, priority, completion = false) => {
        const newTask = {
            id: lastId++,
            title,
            priority,
            completion,
        };
        setTasks([...tasks, newTask]); //Пересоздает 
        setLastId(lastId + 1); 
    };

    const deleteTask = (id = tasks.length - 1) => { // По дефолту удаляется самый последний таск
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext); // Custom hook 
