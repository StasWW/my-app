import React, { useState } from 'react';
import './task.css';
import { useTasks } from '../../context';

const Task = ({ id, title, priority, completion = false }) => {
    const { addTask, deleteTask } = useTasks();
    const [isCompleted, setIsCompleted] = useState(completion);
    const [dropdownVisibility, setDropdownVisibility] = useState(false);

    const toggled = () => {
        setIsCompleted(prevState => !prevState);
    };

    const toggleDropdown = () => {
        setDropdownVisibility(prevState => !prevState);
    };

    const unClickable = (e) => {
        e.stopPropagation();
    };

    const handlePriorityChange = (newPriority) => {
        addTask(title, newPriority);
        deleteTask(id);
    };

    const renderDropdown = () => (
        <div className="dropdownContent">
            <a className='dropdownTxt' onClick={() => handlePriorityChange(0)}>Low priority</a>
            <a className='dropdownTxt' onClick={() => handlePriorityChange(1)}>Medium priority</a>
            <a className='dropdownTxt' onClick={() => handlePriorityChange(2)}>High priority</a>
        </div>
    );

    const priorityText = isCompleted ? '' : `${['Low', 'Medium', 'High'][priority]} priority`;

    return (
        <div className='task' 
            onClick={toggled}
            onContextMenu={(e) => {
                e.preventDefault();
                if (window.confirm('Are you sure you want to delete the task?')) {
                    deleteTask(id);
                }
            }}
            id={`T${id}`}
        >
            <div className='checkInput'>
                <input
                    className='checkboxClass'
                    type="checkbox"
                    checked={isCompleted}
                />
                <label
                    htmlFor={id}
                    className={`taskTitle${isCompleted ? ' checked' : ''}`} 
                >
                    {title}
                </label>
            </div>
            <div
                className='priorityHolder'
                onClick={unClickable}
                onMouseEnter={() => !isCompleted && toggleDropdown()}
                onMouseLeave={() => !isCompleted && toggleDropdown()}
            >
                <span className='priorityText'>{priorityText}</span>
                <div className={`priorityCircle${isCompleted ? '' : ` ${['low', 'medium', 'high'][priority]}`}`} />
                {dropdownVisibility && renderDropdown()}
            </div>
        </div>
    );
};

export default Task;
