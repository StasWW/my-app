import './main.css';
import Task from '../individual-task/task';
import { useTasks } from '../../context';
import { useState, useEffect } from 'react';

function Main() {
    const { taskGroups, currentGroup, setGroupName } = useTasks();
    const [renderInputInsteadOfH, setRenderInputInsteadOfH] = useState(false);
    const [editedGroupName, setEditedGroupName] = useState(taskGroups[currentGroup].name);

    const tasks = taskGroups[currentGroup].tasks;
    const groupName = taskGroups[currentGroup].name;

    useEffect(() => {
        const h1Pointer = document.querySelector('.mainSection h1');
        h1Pointer.addEventListener('dblclick', (e) => {
            e.preventDefault();
            setRenderInputInsteadOfH(true);
        });

        return () => {
            h1Pointer.removeEventListener('dblclick', () => {});
        };
    }, []);

    const handleInputChange = (e) => {
        setEditedGroupName(e.target.value);
    };

    const handleBlur = () => {
        setRenderInputInsteadOfH(false);
        setGroupName(editedGroupName);
    };

    return (
        <div className="mainSection">
            <h1>
                {renderInputInsteadOfH ? (
                    <input
                        className="titleInput"
                        value={editedGroupName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    groupName
                )}
            </h1>
            <div className="taskHolder">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            priority={task.priority}
                            completion={task.completion}
                        />
                    ))
                ) : (
                    <p style={{ marginLeft: 40, fontSize: 18 }}>
                        Let's start by pressing <strong>Add task</strong> to add task to{' '}
                        <strong>{groupName}</strong> task group
                    </p>
                )}
            </div>
        </div>
    );
}

export default Main;
