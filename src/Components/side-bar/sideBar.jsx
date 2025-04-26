import React from 'react';
import './sideBar.css';
import Profile from './Profile/profile';
import AddTask from './add-task/addTask';
import { GroupBar } from './group-bar/group-bar';


class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
    
        return (
            <div className='taskBar'>
                <Profile />
                <GroupBar />
                <AddTask />
            </div>
        );
    }
}

export default SideBar;