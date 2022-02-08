import ACTION_TYPE from '../actions/constants';
let initializeState = {
    tasks : [],
    addTask : {
        quickAddTaskIsActive : false,
        mainAddTaskIsActive : false,
        projectOverlay : false,
        projectID : '',
        date : '',
        isTaskDateActive : false,
        task : '',
    }
};

export default (state = initializeState, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCH_TASKS :
            return {...state, tasks: [...action.payload.tasks]};
        case ACTION_TYPE.SET_MAIN_ADD_TASK_ACTIVE :
            return {...state, addTask: {...state.addTask, mainAddTaskIsActive: action.payload.isActive}};
        case ACTION_TYPE.SET_QUICK_ADD_TASK_ACTIVE :
            return {...state, addTask: {...state.addTask, quickAddTaskIsActive: action.payload.isActive}};
        case ACTION_TYPE.SET_ADD_TASK_TASK :
            return {...state, addTask: {...state.addTask, task: action.payload.task}};
        case ACTION_TYPE.SET_ADD_TASK_PROJECT_OVERLAY :
            return {...state, addTask: {...state.addTask, projectOverlay: action.payload.isActive}};
        case ACTION_TYPE.SET_ADD_TASK_DATE_ACTIVE :
            return {...state, addTask: {...state.addTask, isTaskDateActive: action.payload.isActive}};
        case ACTION_TYPE.SET_ADD_TASK_PROJECT_ID :
            return  {...state, addTask: {...state.addTask, projectID: action.payload.projectID}};
        case ACTION_TYPE.SET_ADD_TASK_DATE :
            return  {...state, addTask: {...state.addTask, date: action.payload.date}};
        case ACTION_TYPE.RESET_ADD_TASK :
            return  {...state, addTask: {...initializeState.addTask}};
        default :
            return state;
    }
}