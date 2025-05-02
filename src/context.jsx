import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([ { name: "Untitled", tasks: [], } ]);
    const [currentGroup, setCurrentGroup] = useState(0);

    let tasks = taskGroups[currentGroup].tasks;
    let groupName = taskGroups[currentGroup].name;

    const addTask = (title, priority, completion = false) => {
        const newTask = {
            id: uuidv4(), 
            title,
            priority,
            completion,
        };
        setTaskGroups(prevTaskGroup => {
            const updatedTaskGroup = [...prevTaskGroup];
            updatedTaskGroup[currentGroup] = {
                ...updatedTaskGroup[currentGroup],
                tasks: [...updatedTaskGroup[currentGroup].tasks, newTask],
            }
            return updatedTaskGroup;
        });
    };

    const deleteTask = (id = tasks[tasks.length - 1].id) => {
        setTaskGroups(prevTaskGroup => {
            const updatedTaskGroup = [...prevTaskGroup];
            updatedTaskGroup[currentGroup] = {
                ...updatedTaskGroup[currentGroup],
                tasks: updatedTaskGroup[currentGroup].tasks.filter((task) => task.id !== id),
            }
            return updatedTaskGroup;
        });
    };

    const setGroupToDisplay = (id) => {
        setCurrentGroup(id);
    };

    const addGroup = () => {
        setTaskGroups(prevTaskGroups => {
            return [...prevTaskGroups, { name: `Untitled${prevTaskGroups.length}`, tasks: [] }];
        });
    };

    const deleteGroup = (id) => {
        if (id === 0 && taskGroups.length <= 1) {
            window.alert('You cannot delete the first group when there are two or fewer groups. Try renaming it instead.');
            return;
        }
    
        setTaskGroups(prevTaskGroups => {
            const updatedTaskGroups = prevTaskGroups.filter((group, index) => index !== id);
            return updatedTaskGroups;
        });
    
        setCurrentGroup(prev => {
            const newGroupCount = taskGroups.length - 1; 
            return prev >= newGroupCount ? newGroupCount - 1 : prev;
        });
    };
    
    const setGroupName = (newName) => {
        setTaskGroups(prevTaskGroups => {
            const updatedTaskGroups = [...prevTaskGroups];
            updatedTaskGroups[currentGroup] = {
                ...updatedTaskGroups[currentGroup],
                name: newName,
            };
            return updatedTaskGroups;
        });
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask, groupName, taskGroups, currentGroup, setGroupToDisplay, addGroup, deleteGroup, setGroupName }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
