import React from "react";
import {connect} from "react-redux";
import {archiveTask} from '../actions';

const Checkbox = ({task, archiveTask}) => {
    return (
        <div className="checkbox-holder" onClick={() => {
            archiveTask(task.docID)
        }}>
            <span className="checkbox"></span>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        active : state.projects.active || 'inbox',
    }
}
export default connect(mapStateToProps, {
    archiveTask
})(Checkbox);