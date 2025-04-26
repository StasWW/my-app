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
        <button
            className="groupElement"
            onMouseEnter={toggleX}
            onMouseLeave={toggleX}
            onClick={handleGroupClick}
        >
            {name}
            {XVisibility && <span className="closingX" onClick={handleXClick}>X</span>}
        </button>
    );
}
