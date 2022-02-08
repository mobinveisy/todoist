import React from "react";
import {FaPizzaSlice} from 'react-icons/fa';
import './Header.css';
import {setQuickAddTaskActive} from "../../actions";
import {connect} from "react-redux";

const Header = ({setQuickAddTaskActive,quickAddTaskIsActive }) => {

    return (
        <header className="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.png" alt="Logo PNG"/>
                </div>
                <div className="settings">
                    <ul>
                        <li className="settings__add">
                            <button role="button" onClick={() => {
                                setQuickAddTaskActive(!quickAddTaskIsActive);
                            }}>
                                +
                            </button>
                        </li>
                        <li className="settings__darkmode">
                            <button role="button">
                                <FaPizzaSlice/>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )

};
const mapStateToProps = (state) => {
    return {
        quickAddTaskIsActive : state.tasks.addTask.quickAddTaskIsActive,
    }
}
export default connect(mapStateToProps, {
    setQuickAddTaskActive,
})(Header);
