import React from 'react';
import './task.css';
import AddTask from '../side-bar/add-task/addTask';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            priority: props.priority,
            completion: props.completion ?? false,
            dropdownVisibility: false,
        };

        this.toggled = this.toggled.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.renderDropdown = this.renderDropdown.bind(this);
        this.unClickable = this.unClickable.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
    }

    toggled() {
        this.setState(prevState => ({
            completion: !prevState.completion,
        }));
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownVisibility: !prevState.dropdownVisibility,
        }));
    }

    unClickable(e) {
        e.stopPropagation();
    }

    handlePriorityChange(priority) {
        return () => {
            this.setState({
                priority,
                dropdownVisibility: false,
            });
        };
    }

    renderDropdown() {
        return (
            <div className="dropdownContent">
                <a className='dropdownTxt' onClick={this.handlePriorityChange(0)}>Low priority</a>
                <a className='dropdownTxt' onClick={this.handlePriorityChange(1)}>Medium priority</a>
                <a className='dropdownTxt' onClick={this.handlePriorityChange(2)}>High priority</a>
            </div>
        );
    }

    render() {
        const { id, title, completion, priority, dropdownVisibility } = this.state;
        const priorityText = completion ? '' : `${['Low', 'Medium', 'High'][priority]} priority`;

        return (
            <div className='task' 
            onClick={this.toggled}
            id={`T${id}`}
            >
                <div className='checkInput'>
                    <input
                        className='checkboxClass'
                        type="checkbox"
                        checked={completion}
                        onChange={this.toggled}
                    />
                    <label
                        htmlFor={id}
                        className={`taskTitle${completion ? ' checked' : ''}`} 
                    >
                        {title}
                    </label>
                </div>
                <div
                    className='priorityHolder'
                    onClick={this.unClickable}
                    onMouseEnter={() => !completion && this.toggleDropdown()}
                    onMouseLeave={() => !completion && this.toggleDropdown()}
                >
                    <span className='priorityText'>{priorityText}</span>
                    <div className={`priorityCircle${completion ? '' : ` ${['low', 'medium', 'high'][priority]}`}`} />
                    {dropdownVisibility && this.renderDropdown()}
                </div>
            </div>
        );
    }
}

export default Task;
