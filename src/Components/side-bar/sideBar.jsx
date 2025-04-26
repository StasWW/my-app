import React from 'react';
import './sideBar.css';
import Profile from './Profile/profile';
import TaskGroup from './task-group/task-group';
import AddTask from './add-task/addTask';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className='taskBar'>
                <Profile />
                <AddTask />
            </div>
        );
    }
}

export default SideBar;