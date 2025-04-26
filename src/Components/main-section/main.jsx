import './main.css';
import Task from '../individual-task/task';
import { useTasks } from '../../context';
import AddTask from '../side-bar/add-task/addTask';


function Main() {
    const { tasks, addTask, deleteTask } = useTasks();

    return (
        <div className="mainSection">
            <h1>Untitled</h1>
            <div className="taskHolder">
                {   
                tasks.length > 0 ? (
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            priority={task.priority}
                            completion={task.completion}
                        />
                    ))
                ) : (
                    <p style={ {marginLeft: 40, fontSize: 18} }>Let's start by pressing <strong>Add task</strong></p>
                )
             }
            </div>
        </div>
    );
}


export default Main;
