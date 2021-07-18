import React from "react";

import BugFilter from "./BugFilter";
import BugTable from "./BugTable";
import BugAdd from "./BugAdd";

export default class BugList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bugs: []
        }
    }

    componentDidMount(){
        this.loadData();
    }

    componentDidUpdate(prevProps) {
      var oldQuery = prevProps.location.query;
      var newQuery = this.props.location.query;
      if (oldQuery.priority === newQuery.priority &&
          oldQuery.status === newQuery.status) {
        console.log("BugList: componentDidUpdate, no change in filter, not updating");
        return;
      } else {
        console.log("BugList: componentDidUpdate, loading data with new filter");
        this.loadData();
      }
    }

    loadData(filter){
        var query = this.props.location.query || {};
        var filter = {priority: query.priority, status: query.status};
        $.ajax({
            type: 'GET',
            url: '/api/bugs',
            data: filter,
            success: function(data){
                this.setState({
                    bugs: data
                })
            }.bind(this)
        })
    }

    changeFilter(newFilter) {
      this.props.history.push({search: '?' + $.param(newFilter)});
    }

    addBug(bug){
        console.log("Adding bug:", bug);
         $.ajax({
           type: 'POST', url: '/api/bugs', contentType: 'application/json',
           data: JSON.stringify(bug),
           success: function(data) {
             console.log(data)
             var bug = data;
             // We're advised not to modify the state, it's immutable. So, make a copy.
             var bugsModified = this.state.bugs.concat(bug);
             this.setState({bugs: bugsModified});
           }.bind(this),
           error: function(xhr, status, err) {
             // ideally, show error to user.
             console.log("Error adding bug:", err);
           }
     });
    }

    render(){
        return(
            <div className="container">
                <h1>Bug Tracker</h1>
                <BugFilter submitHandler={this.changeFilter.bind(this)} initFilter={this.props.location.query}/>
                <hr/>
                <BugTable bugs={this.state.bugs}/>
                <hr/>
                <BugAdd addBug={this.addBug.bind(this)}/>
            </div>
        )
    }
}
