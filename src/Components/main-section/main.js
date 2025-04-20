import './main.css';
import Task from '../individual-task/task';

function Main (props) {
    return (
        <div className="mainSection">
            <h1>{props.section ?? 'Untitled'}</h1>
            <div className="taskHolder">
                <Task id="0" title="Viebat barana" completion={false}></Task>
            </div>
            {/* Here should be a button to add task */}
        </div>
    );
}

export default Main;