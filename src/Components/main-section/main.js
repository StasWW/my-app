import './main.css';
import Task from '../individual-task/task';

function Main (props) {
    return (
        <div className="mainSection">
            <h1>{props.section ?? 'Untitled'}</h1>
            <div className="taskHolder">
                
            </div>
        </div>
    );
}

export default Main;
