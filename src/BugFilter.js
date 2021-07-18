import React from "react";

export default class BugFilter extends React.Component{

    constructor(props){
        super(props);
        var initFilter = this.props.initFilter;
        console.log(initFilter);
        this.state = {
            status: initFilter.status,
            priority: initFilter.priority,
        }
    }

    onSelect(){
        this.setState({
            status: this.refs.status.value,
            priority: this.refs.priority.value,
        })
    }

    componentWillReceiveProps(newProps) {
      if (newProps.initFilter.status === this.state.status
          && newProps.initFilter.priority === this.state.priority) {
        console.log("BugFilter: componentWillReceiveProps, no change");
        return;
      }
      console.log("BugFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
      this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
    }

    filterHandler(e){
        // console.log("Iam")
        // this.props.loadData({
        //     status: this.state.status,
        //     priority: this.state.priority
        // })
        var newFilter = {};
        if (this.state.priority) newFilter.priority = this.state.priority;
        if (this.state.status) newFilter.status = this.state.status;
        this.props.submitHandler(newFilter);
    }

    render(){

        return(
            <div>
                <h3>Bug Filter</h3>
                Status
                <select ref="status" value={this.state.status} onChange={this.onSelect.bind(this)}>
                    <option value="">(Any)</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="New">New</option>
                </select>
                &nbsp;
                Priority
                <select ref="priority" value={this.state.priority} onChange={this.onSelect.bind(this)}>
                    <option value="">(Any)</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </select>
                <br/>
                <br/>
                <input className="btn btn-info" type="button" value="Apply Filter" onClick={this.filterHandler.bind(this)}/>
            </div>
        )
    }
}
