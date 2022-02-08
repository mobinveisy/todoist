import React from 'react';
import {FaInbox, FaRegCalendarAlt, FaRegCalendar, FaChevronDown} from 'react-icons/fa';
import './Sidebar.css';
import Projects from '../Projects';
import AddProject from "../AddProject";
import {fetchTasks, setActiveProject} from '../../actions';
import {connect} from "react-redux";
const Sidebar = ({active, setActiveProject, fetchTasks}) => {
    return (
        <div>
            <div className="sidebar">
                <ul className="sidebar__generic">
                    <li className={active === 'inbox' ? 'active' : undefined} onClick={() => {
                        if(active != 'inbox') {
                            fetchTasks('inbox');
                        }
                        setActiveProject('inbox');

                    }}>
                        <div>
                            <span><FaInbox/></span>
                            <span>Inbox</span>
                        </div>
                    </li>
                    <li className={active === 'today' ? 'active' : undefined} onClick={() => {
                        if(active != 'today') {
                            fetchTasks('today');
                        }
                        setActiveProject('today');
                    }}>
                        <div>
                            <span><FaRegCalendar/></span>
                            <span>Today</span>
                        </div>
                    </li>
                    <li className={active === 'next_7' ? 'active' : undefined} onClick={() => {
                        if(active != 'next_7') {
                            fetchTasks('next_7');
                        }
                        setActiveProject('next_7');
                    }}>
                        <div>
                            <span><FaRegCalendarAlt/></span>
                            <span>Next 7 Days</span>
                        </div>
                    </li>
                </ul>
                <div className="sidebar__middle">
                    <span><FaChevronDown/></span>
                    <span><h2>Projects</h2></span>
                </div>
                <Projects/>
                <AddProject/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        active : state.projects.active
    }
}
export default connect(mapStateToProps, {
    setActiveProject,
    fetchTasks,
})(Sidebar);
