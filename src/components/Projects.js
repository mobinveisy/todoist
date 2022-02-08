import React, {Component} from 'react';
import {fetchProjects, fetchTasks, setActiveProject} from '../actions';
import {connect} from "react-redux";
import IndividualProject from "./IndividualProject";
class Projects extends Component {


    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        let {projects, setActiveProject, active, fetchTasks} = this.props;
        console.log(this.props.projects);
        return (
            <ul className="sidebar__projects">
                {projects.length && projects.map(project => (
                    <li className={active === project.projectID ? 'sidebar__project active' : 'sidebar__project'} onClick={() => {
                        // eslint-disable-next-line eqeqeq
                        if(project.projectID != active) {
                            fetchTasks(project.projectID);
                        }
                        setActiveProject(project.projectID);
                    }} key={project.projectID}>
                        <div role="button">
                            <IndividualProject project={project}/>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects : state.projects.projects,
        active : state.projects.active,
    }
}
export default connect(mapStateToProps, {
    fetchProjects,
    setActiveProject,
    fetchTasks,
})(Projects);