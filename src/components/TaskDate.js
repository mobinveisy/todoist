import React from "react";
import {connect} from "react-redux";
import {setAddTaskDateActive, setAddTaskDate} from "../actions";
import moment from "moment";
import {FaSpaceShuttle, FaSun, FaRegPaperPlane} from "react-icons/fa";

const TaskDate = ({isTaskDateActive, setAddTaskDateActive, setAddTaskDate}) => {
    console.log(isTaskDateActive, "Task");
        return (isTaskDateActive && (
            <div className="task-date" data-testid="task-date-overlay">
                <ul className="task-date__list">
                    <li>
                        <div
                            onClick={() => {
                                setAddTaskDateActive(false);
                                setAddTaskDate(moment().format('DD/MM/YYYY'));
                            }}
                            data-testid="task-date-today"
                            tabIndex={0}
                            aria-label="Select today as the task date"
                            role="button"
                        >
            <span>
              <FaSpaceShuttle />
            </span>
                            <span>Today</span>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => {
                                setAddTaskDateActive(false);
                                setAddTaskDate(
                                    moment()
                                        .add(1, 'day')
                                        .format('DD/MM/YYYY')
                                );
                            }}
                            onKeyDown={() => {
                                setAddTaskDateActive(false);
                                setAddTaskDate(
                                    moment()
                                        .add(1, 'day')
                                        .format('DD/MM/YYYY')
                                );
                            }}
                            data-testid="task-date-tomorrow"
                            role="button"
                            tabIndex={0}
                            aria-label="Select tomorrow as the task date"
                        >
            <span>
              <FaSun />
            </span>
                            <span>Tomorrow</span>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => {
                                setAddTaskDateActive(false);
                                setAddTaskDate(
                                    moment()
                                        .add(7, 'days')
                                        .format('DD/MM/YYYY')
                                );
                            }}
                            data-testid="task-date-next-week"
                            aria-label="Select next week as the task date"
                            tabIndex={0}
                            role="button"
                        >
            <span>
              <FaRegPaperPlane />
            </span>
                            <span>Next week</span>
                        </div>
                    </li>
                </ul>
            </div>
        ));
}
const mapStateToProps = (state) => {
    return {
        isTaskDateActive : state.tasks.addTask.isTaskDateActive,
    }
}
export default connect(mapStateToProps, {
    setAddTaskDateActive,
    setAddTaskDate
})(TaskDate);