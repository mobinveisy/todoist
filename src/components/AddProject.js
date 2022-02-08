import React from "react";
import './AddProject.css';
import {connect} from "react-redux";
import {setAddProjectValue, setAddProjectActive, addProject} from '../actions';
const AddProject = ({isActive, value, setAddProjectValue, setAddProjectActive, addProject}) => {
    return (
        <div className="add-project">
            {isActive && (
                <div className="add-project__input">
                    <input value={value} onChange={(e) => {

                        setAddProjectValue(e.target.value);
                    }} className="add-project__name" placeholder="Project Name"/>
                    <button className="add-project__submit" onClick={() => {
                        addProject(value);
                    }}>Add Project</button>
                    <span className="add-project__cancel" onClick={() => {
                        setAddProjectActive(!isActive);
                    }}>Cancel</span>
                </div>
            )}
            <span className="add-project__plus">+</span>
            <span children="add-project__text" onClick={() => {
                setAddProjectActive(!isActive);
            }}>Add Project</span>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isActive : state.projects.addProject.isActive,
        value : state.projects.addProject.value,
    }
}
export default connect(mapStateToProps, {
    setAddProjectValue,
    setAddProjectActive,
    addProject
})(AddProject);