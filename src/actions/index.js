import {firebase} from "../firebase";
import ACTION_TYPE from './constants';
import {generatePushId} from "../helpers";
import moment from 'moment';
export const fetchProjects = () => {

    return async (dispatch, getState) => {
        let result = await firebase
            .firestore()
            .collection('projects')
            .where('userID', '==', 'Mobin')
            .get();
        let projects = result.docs.map(project => ({
            docID : project.id,
            ...project.data(),
        }))

        dispatch({
            type : ACTION_TYPE.FETCH_PROJECTS,
            payload : {
                projects : projects,
            }
        });
    }

}


export const setAddProjectValue = (value) => {
    return {
        type : ACTION_TYPE.SET_ADD_PROJECT_VALUE,
        payload : {
            value
        }
    };
};

export const setAddProjectActive = (isActive) => {
    return {
        type : ACTION_TYPE.SET_ADD_PROJECT_ACTIVE,
        payload : {
            isActive,
        }
    };
};

export const setQuickAddTaskActive = (isActive) => {
    return {
        type : ACTION_TYPE.SET_QUICK_ADD_TASK_ACTIVE,
        payload : {
            isActive,
        }
    };
};

export const setMainAddTaskActive = (isActive) => {
    return {
        type : ACTION_TYPE.SET_MAIN_ADD_TASK_ACTIVE,
        payload : {
            isActive,
        }
    };
};

export const addProject = (projectName) => {
    if(projectName) {
        return async (dispatch, getState) => {
            let projectID = generatePushId();
            await firebase
                .firestore()
                .collection('projects')
                .add({
                    name : projectName,
                    projectID,
                    userID : 'Mobin',
                });
            dispatch({
                type : ACTION_TYPE.RESET_ADD_PROJECT,
            });
            dispatch(fetchProjects());
        }
    }
    return {};
};


export const setDeleteProjectShowConfirm = (showConfirm, projectID = null) => {
    return {
        type : ACTION_TYPE.SET_DELETE_PROJECT_SHOW_CONFIRM,
        payload : {
            showConfirm,
            projectID,
        }
    };
};

export const deleteProject = (docID) => {
    if(docID) {
        return async (dispatch) => {
            await firebase
                .firestore()
                .collection('projects')
                .doc(docID)
                .delete();
            dispatch(fetchProjects());
        }
    }
    return {};
}

export const setActiveProject = (active) => {
    return {
        type : ACTION_TYPE.SET_ACTIVE_PROJECT,
        payload : {
            active,
        }
    }
}

export const fetchTasks = (active) => {
    return async (dispatch, getState) => {

        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userID', '==', 'Mobin');
        let project = (getState().projects.projects.find(project => project.projectID === active));

        unsubscribe =
            active && project
                ? (unsubscribe = unsubscribe.where('projectID', '==', active))
                : active === 'today'
                ? (unsubscribe = unsubscribe.where(
                    'date',
                    '==',
                    moment().format('DD/MM/YYYY')
                ))
                : active === 'inbox' || active === null
                    ? (unsubscribe = unsubscribe.where('date', '==', ''))
                    : unsubscribe;

        let result = await unsubscribe.get();

        let newTasks = result.docs.map(task => ({
            docID: task.id,
            ...task.data(),
        }));

        newTasks = active === 'next_7'
            ? newTasks.filter(
                task =>
                    moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                    task.archived !== true
            )
            : newTasks.filter(task => task.archived !== true);

        dispatch({
            type: ACTION_TYPE.FETCH_TASKS,
            payload: {
                tasks: newTasks,
            }
        });
    };
};


export const archiveTask = (id) => {
    if (id) {
        return async (dispatch, getState) => {
            await firebase
                .firestore()
                .collection('tasks')
                .doc(id)
                .update({
                    archived: true,
                });

            dispatch(fetchTasks(getState().projects.active));
        }
    }
    return {};
}


export const setAddTaskTask = (task) => {
    return {
        type : ACTION_TYPE.SET_ADD_TASK_TASK,
        payload : {
            task
        }
    }
}

export const setAddTaskProjectOverlay = (isActive) => {
    return {
        type : ACTION_TYPE.SET_ADD_TASK_PROJECT_OVERLAY,
        payload : {
            isActive,
        }
    };
};

export const setAddTaskProjectID = (projectID) => {
    if(projectID) {
        return {
            type : ACTION_TYPE.SET_ADD_TASK_PROJECT_ID,
            payload : {
                projectID,
            }
        }
    }
    return  {};
}

export const setAddTaskDateActive = (isActive) => {
    return {
        type : ACTION_TYPE.SET_ADD_TASK_DATE_ACTIVE,
        payload : {
            isActive,
        }
    };
};


export const setAddTaskDate = (date) => {
    if(date) {
        return {
            type : ACTION_TYPE.SET_ADD_TASK_DATE,
            payload : {
                date,
            }
        }
    }
    return  {};
}


export const addTask = (task) => {
    if (task) {
        return async (dispatch, getState) => {
            const projectID = getState().tasks.addTask.projectID || getState().projects.active;

            let collatedDate = '';

            if (projectID === 'TODAY') {
                collatedDate = moment().format('DD/MM/YYYY');
            } else if (projectID === 'NEXT_7') {
                collatedDate = moment()
                    .add(7, 'days')
                    .format('DD/MM/YYYY');
            }

            let result = await firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectID: projectID,
                    task,
                    date: collatedDate || getState().tasks.addTask.date,
                    userID: 'Mobin',
                });

            dispatch({
                type: ACTION_TYPE.RESET_ADD_TASK,

            });
            dispatch(fetchTasks(getState().projects.active));
        }
    }
    return {};
}

export const resetAddTask = () => {
    return {
        type : ACTION_TYPE.RESET_ADD_TASK,
    }
}