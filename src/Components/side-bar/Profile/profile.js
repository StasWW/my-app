import React from "react";
import './profile.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userId: props.userId ?? '-1',
        name: props.name ?? 'Anonymous user',
        pfpFileName: props.pfpFileName?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kXVJsahOTMHrAaWeK9t6tzRj8prZFaym1A&s',
    };
    }
    render () {
        return (
            <div className="profile">
                <img src={this.state.pfpFileName}
                alt="profile-picture"
                />
                <div className="profileTextHolder">
                    <span id="name">{this.state.name}</span>
                    <span id="subName">User Id: {this.state.userId}</span>
                </div>
            </div>
        );
    }
}

export default Profile;