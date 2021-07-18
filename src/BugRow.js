import React from "react";
import {Link} from "react-router";

export default class BugRow extends React.Component{
    render(){
        return(
            <tr>
                <td><Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link></td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
}
