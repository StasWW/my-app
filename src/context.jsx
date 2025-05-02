import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TasksContext = createContext();

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('taskAppData');
  return savedData ? JSON.parse(savedData) : { taskGroups: [{ name: "Untitled", tasks: [] }], currentGroup: 0 };
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('taskAppData', JSON.stringify(data));
};

export const TasksProvider = ({ children }) => {
  const { taskGroups, currentGroup } = loadFromLocalStorage();
  const [state, setState] = useState({ taskGroups, currentGroup });

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const addTask = (title, priority, completion = false) => {
    const newTask = { id: uuidv4(), title, priority, completion };
    const updatedTaskGroups = [...state.taskGroups];
    updatedTaskGroups[state.currentGroup].tasks.push(newTask);
    setState({ ...state, taskGroups: updatedTaskGroups });
  };

  const deleteTask = (id = state.taskGroups[state.currentGroup].tasks[state.taskGroups[state.currentGroup].tasks.length - 1].id) => {
    const updatedTaskGroups = [...state.taskGroups];
    updatedTaskGroups[state.currentGroup].tasks = updatedTaskGroups[state.currentGroup].tasks.filter(task => task.id !== id);
    setState({ ...state, taskGroups: updatedTaskGroups });
  };

  const setGroupToDisplay = (id) => {
    setState({ ...state, currentGroup: id });
  };

  const addGroup = () => {
    const updatedTaskGroups = [...state.taskGroups, { name: `Untitled${state.taskGroups.length}`, tasks: [] }];
    setState({ ...state, taskGroups: updatedTaskGroups });
  };

  const deleteGroup = (id) => {
    if (id === 0 && state.taskGroups.length <= 1) {
      window.alert('You cannot delete the first group when there are two or fewer groups. Try renaming it instead.');
      return;
    }
    const updatedTaskGroups = state.taskGroups.filter((_, index) => index !== id);
    setState({ ...state, taskGroups: updatedTaskGroups, currentGroup: Math.min(state.currentGroup, updatedTaskGroups.length - 1) });
  };

  const setGroupName = (newName) => {
    const updatedTaskGroups = [...state.taskGroups];
    updatedTaskGroups[state.currentGroup].name = newName;
    setState({ ...state, taskGroups: updatedTaskGroups });
  };

  return (
    <TasksContext.Provider value={{
      tasks: state.taskGroups[state.currentGroup].tasks,
      addTask,
      deleteTask,
      groupName: state.taskGroups[state.currentGroup].name,
      taskGroups: state.taskGroups,
      currentGroup: state.currentGroup,
      setGroupToDisplay,
      addGroup,
      deleteGroup,
      setGroupName
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
