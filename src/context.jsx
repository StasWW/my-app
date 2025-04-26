import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([ {name: "Untitled", tasks: [],} ]); //Создаем хук, tasks - данные в state, setTasks - setter функция
    const [currentGroup, setCurrentGroup] = useState(0);

    let tasks = taskGroups[currentGroup].tasks;
    let groupName = taskGroups[currentGroup].name;

    const minAvailableId = () => {
        if (tasks.length === 0) {
            return 0;
        } else {
            const tasksId = new Set( tasks.map( (task) => task.id ) ) // Set, потому что его время обращения к элементу О(1)
            let id = 0;
            while (tasksId.has(id)) {
                id++;
            }
            return id;
        }
    }

    const addTask = (title, priority, completion = false) => {
        const newTask = {
            id: minAvailableId(), 
            title,
            priority,
            completion,
        };
        setTaskGroups( prevTaskGroup => {
            const updatedTaskGroup = [...prevTaskGroup];
            updatedTaskGroup[currentGroup] = {
                ...updatedTaskGroup[currentGroup],
                tasks: [...updatedTaskGroup[currentGroup].tasks, newTask],
            }
            return updatedTaskGroup;
        } );
        console.log(taskGroups);
    };

    const deleteTask = (id = tasks.length - 1) => { // По дефолту удаляется самый последний таск
        setTaskGroups( prevTaskGroup => {
            const updatedTaskGroup = [...prevTaskGroup];
            updatedTaskGroup[currentGroup] = {
                ...updatedTaskGroup[currentGroup],
                tasks: [...updatedTaskGroup[currentGroup].tasks.filter((task) => task.id !== id)],
            }
            return updatedTaskGroup;
        } );
    };

    const setGroupToDisplay = (id) => {
        setCurrentGroup(id);
        console.log(id);
    }

    const addGroup = () => {
        setTaskGroups( prevTaskGroups => {
            return [...prevTaskGroups, { name: `Untitled${prevTaskGroups.length}`, tasks: [] }];
        } )
        console.log(taskGroups);
    }

    const deleteGroup = (id) => {
        if (id !== 0) {
            setTaskGroups ( (prevTaskGroups) => {
                const updatedTaskGroups = prevTaskGroups.filter((group, index) => index !== id);
                // If the current group is deleted, update the currentGroup state
                if (currentGroup === id) {
                    setCurrentGroup((prev) => (prev >= updatedTaskGroups.length ? updatedTaskGroups.length - 1 : prev));
                }
                return updatedTaskGroups;
            })
        } else {
            window.alert('You cannot delete the only group! Try renaming the group instead');
            console.error('Cannot delete the only group')
        }
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask, groupName, taskGroups, currentGroup, setGroupToDisplay, addGroup, deleteGroup }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext); // Custom hook 
