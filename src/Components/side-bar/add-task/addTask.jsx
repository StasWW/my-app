import React from "react";
import './addTask.css';
import Task from "../../individual-task/task";
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }
    }

    /* Tasks have: title, priority, completion 
    TODO - description
    LONG TODO - due date, reminder date
    */ 
    //Example task properties: <Task id="0" title="Viebat barana" completion={false}></Task>
    addTask (title, priority, completion=false) {  
        const taskPlace = document.querySelector('.taskHolder');
        const root = createRoot(taskPlace);
        let lastTaskId = this.state.tasks.length - 1;

        const task = {
            id: lastTaskId + 1,  // Increment the id to create a unique task id
            title,
            priority, 
            completion,
        };

        this.setState(prevState => ({
            tasks: [...prevState.tasks, task],
        }));

        lastTaskId++;
        root.render(<Task id={task.id} title={task.title} priority={task.priority} completion={task.completion}/>);
        console.log(task)
    }
    getTasks () {
        return this.state.tasks;
    }
    deleteTask (id) {
        const elementToRemove = document.querySelector(`.task#T${id}`)
        elementToRemove.remove();
        this.setState(prevState => ({ 
            tasks: prevState.tasks.filter(task => task.id !== id), //Просто заново создаем массив
          }));
    }
    userChangedSomething ({ title, priority, completion }) {

    } 
    render () {
        return (
        <div className="addTask">
            <button 
            className="addTaskBtn col-10"
            onClick={() => this.addTask("Viebat barana", 0)}
            >
                <span className="plusSign">+</span>Add Task
            </button>
            <button 
            className="addListBtn col"
            onClick={() => this.deleteTask(0)}
            >
                -
            </button>
        </div>
        );
    }
}

export default AddTask;