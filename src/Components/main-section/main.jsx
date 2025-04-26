import './main.css';
import Task from '../individual-task/task';
import { useTasks } from '../../context';


function Main() {
    const { tasks, addTask, deleteTask } = useTasks();

    return (
        <div className="mainSection">
            <h1>Untitled</h1>
            <div className="taskHolder">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        priority={task.priority}
                        completion={task.completion}
                    />
                ))}
            </div>
        </div>
    );
}


export default Main;
