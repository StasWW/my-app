import React from 'react';
import './task.css';

{/* TODO */}
{/* On click title should be editable */}
{/* Dropdown to change priority */}
{/* Trigger desciption element */}

class Task extends React.Component {
    constructor(props) { //id, title, completion, priority
        super(props);

        this.state = {
            id: props.id,
            title: props.title,
            priority: props.priority ?? 0,
            completion: props.completion ?? false,
            dropdownVisibility: false,
        };

        this.toggled = this.toggled.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggled() {
        this.setState({
            completion: !this.state.completion,
        })
    }
    toggleDropdown () {
        this.setState({
            dropdownVisibility: !this.state.dropdownVisibility,
        })
    }
    unClickable (e) { //Prevents action of parants element
        e.stopPropagation();
    }
    render() {
        return (
            
        <div 
            className='task'
            onClick={this.toggled}    
        >
            <div className='checkInput'>
                <input
                    type="checkbox"
                    checked={this.state.completion}
                    onChange={this.toggled}
                    id={this.state.id}
                />
                <label
                    htmlFor={this.state.id}
                    className={'taskTitle' + (this.state.completion? ' checked' : '')}
                > 
                    {this.state.title}
                </label>
            </div>
            <div 
            className='priorityHolder'
            onClick={this.unClickable}
            onMouseEnter={this.toggleDropdown}
            onMouseLeave={this.toggleDropdown}
            >
                <span
                    className='priorityText'
                >
                    {this.state.completion? ``: `${['Low', 'Medium', 'High'][this.state.priority]} priority` }
                </span>
                <div className={this.state.completion? `priorityCircle` : `priorityCircle ${['low', 'medium', 'high'][this.state.priority]}`} />
            </div>

        </div>);
    }
}

export default Task;