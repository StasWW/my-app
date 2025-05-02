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
            <button class="logTaskBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
</svg></button>
            <button class="cancelTaskBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg></button>
            `
        );

        
        const taskHolder = document.querySelector('.taskHolder');
        taskHolder.appendChild(taskDiv);
        
        let title = '';
        const input = document.querySelector('.task > input');
        input.addEventListener('change', (e) => { title=e.target.value })

        const buttonAdd = taskDiv.querySelector('.logTaskBtn');  
        buttonAdd.addEventListener('click', () => {
            addTask(title, 0);  
            document.querySelector('.task.inp').remove();  
        })

        const buttonCancel = taskDiv.querySelector('.cancelTaskBtn');
        buttonCancel.addEventListener('click', () => {
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
            onClick={() => { tasks.length > 0 ? handleDeleteTask(): alert('There are no tasks to delete!')}}
            >
                -
            </button>
        </div>
    </>
    );
}

export default AddTask;