import React from 'react';
import './sideBar.css';
import Profile from './Profile/profile';
import TaskGroup from './task-group/task-group';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='taskBar'>
                <Profile />
                <TaskGroup name="My Day"/>
            </div>
        );
    }
}

export default SideBar;