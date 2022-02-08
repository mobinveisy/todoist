import React from "react";
import {FaTrashAlt} from 'react-icons/fa';
import './IndividualProject.css';
import {connect} from "react-redux";
import {setDeleteProjectShowConfirm, deleteProject} from "../actions";

const IndividualProject = ({project, showConfirm, setDeleteProjectShowConfirm, showConfirmProjectID, deleteProject}) => {
    return (
        <>
            <span className="sidebar__dot">•</span>
            <span className="sidebar__project-name">
                {project.name}
            </span>
            <span className="sidebar__project-delete" onClick={() => {
                setDeleteProjectShowConfirm(!showConfirm, project.projectID);
            }}>
                <FaTrashAlt/>
                {showConfirm && showConfirmProjectID === project.projectID && (
                    <div className="project-delete-modal">
                        <div className="project-delete-modal__inner">
                            <p>Are you sure you want to delete this project?</p>
                            <button type="button" onClick={() => {
                                setDeleteProjectShowConfirm(false,null);
                                deleteProject(project.docID);
                            }}>
                                Delete
                            </button>
                            <span role="button" onClick={() => {
                                setDeleteProjectShowConfirm(!showConfirm, project.projectID);
                            }}>
                                Cancel
                            </span>
                        </div>
                    </div>
                )}
            </span>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        showConfirm: state.projects.deleteProject.showConfirm,
        showConfirmProjectID: state.projects.deleteProject.projectID,
    }
}
export default connect(mapStateToProps, {
    setDeleteProjectShowConfirm,
    deleteProject
})(IndividualProject);