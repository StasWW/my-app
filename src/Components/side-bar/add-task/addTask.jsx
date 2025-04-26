import React, { useState } from "react";
import './addTask.css';
import { useTasks } from "../../../context";

function AddTask () {

    /* Tasks have: title, priority, completion 
    TODO - description
    LONG TODO - due date, reminder date(?)
    */ 
    
    const { tasks, addTask, deleteTask, setGroupToDisplay, addGroup } = useTasks();

    const handleAddTask = () => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.classList.add('inp');


        taskDiv.innerHTML = (
            `<input 
                className="titleInput"
                placeholder="Name of your task here"
            />
            <button>Log Task</button>
            `
        );

        
        const taskHolder = document.querySelector('.taskHolder');
        taskHolder.appendChild(taskDiv);
        
        let title = '';
        const input = document.querySelector('.task > input');
        input.addEventListener('change', (e) => { title=e.target.value })

        const button = taskDiv.querySelector('button');  
        button.addEventListener('click', () => {
            addTask(title, 0);  
            document.querySelector('.task.inp').remove();
    });
    };
    const handleDeleteTask = () => {
        deleteTask();
    }
    

    return (
    <>  
        <div className="addList">
            <button
                className="addListBtn"
                onClick={addGroup}
            >
                Add List
            </button>
        </div>
        <div className="addTask">
            <button 
            className="addTaskBtn col-10"
            onClick={handleAddTask}
            >
                <span className="plusSign">+</span>Add Task
            </button>
            <button 
            className="delTaskBtn col"
            onClick={handleDeleteTask}
            >
                -
            </button>
        </div>
    </>
    );
}

export default AddTask;