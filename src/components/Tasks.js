import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchTasks} from '../actions';
import './Tasks.css';
import {tabs} from '../constant';
import Checkbox from "./Checkbox";
import AddTask from "./AddTask";
class Tasks extends Component {


    componentDidMount() {
        this.props.fetchTasks(this.props.active);
    }

    render() {
        let {tasks, active, projects} = this.props;
        let projectName = '';
        if(active === null) {
            active = 'inbox';
        }
        let tab = tabs.find(t => t.key === active);
        if(tab) {
            projectName = tab.name;
        }
        let project = projects.find(t => t.projectID === active);
        if(project && !tab) {
            projectName = project.name;
        }

        return (
            <div className="tasks">
                <h2>{projectName}</h2>
                <ul className="tasks__list">
                    {tasks && tasks.map(task => (
                        <li><span><Checkbox task={task}/></span><span>{task.task}</span></li>
                    ))}
                </ul>
                <AddTask/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks.tasks,
        active : state.projects.active,
        projects : state.projects.projects,
    };
}

export default connect(mapStateToProps, {
    fetchTasks,
})(Tasks);