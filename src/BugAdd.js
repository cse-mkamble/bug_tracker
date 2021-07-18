import React from "react";

export default class BugAdd extends React.Component{

    handleSubmit(e){
        e.preventDefault();
        var form = document.forms.bugForm;
        this.props.addBug({
            owner: form.owner.value,
            title: form.title.value,
            status: 'New',
            priority: 'P1'
        });
        form.owner.value = ''.
        form.title.value = '';
    }

    render(){
        return(
            <div>
                <form name="bugForm">
                    <input type="text" className="form-control" placeholder="Owner" name="owner"/>
                    <br/>
                    <input type="text" className="form-control" placeholder="Title" name="title"/>
                    <br/>
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.handleSubmit.bind(this)}/>
                </form>
            </div>
        )
    }
}
