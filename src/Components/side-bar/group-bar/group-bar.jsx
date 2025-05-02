import React from "react";
import { useState } from "react";
import { useTasks } from "../../../context";
import './group-bar.css';

export function GroupBar() {
    const { taskGroups } = useTasks();

    return (
        <div className="groupHolder">
            <hr />
            {taskGroups.map( (grp) => {
                return (<Group 
                    key={taskGroups.indexOf(grp)}
                    name={grp.name}
                    id={taskGroups.indexOf(grp)}
                />
                );
            } )}
        </div>
    );
}

export function Group({ name, id }) {
    const [XVisibility, setXVisibility] = useState(false);
    const { deleteGroup, setGroupToDisplay } = useTasks();

    const toggleX = () => {
        setXVisibility(prev => !prev);
    };

    const handleXClick = (e) => {
        e.stopPropagation();
        deleteGroup(id);
    };

    const handleGroupClick = () => {
        setGroupToDisplay(id);
    }

    return (
        <div className="debilHolder"
            onMouseEnter={toggleX}
            onMouseLeave={toggleX}
            onClick={handleGroupClick}
        >
            <button
                className="groupElement"
                
            >
                {name}
            </button>
            {XVisibility && <div className="closingX" onClick={handleXClick}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="100%" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg></div>}
        </div>
    );
}
