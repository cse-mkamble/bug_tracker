import React from "react";

import BugRow from "./BugRow";

export default class BugTable extends React.Component{

    render(){
        var bugRows = this.props.bugs.map(function(bug) {
            return <BugRow key={bug._id} bug={bug} />
        });

        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bugRows}
                    </tbody>
                </table>
            </div>
        )
    }
}
