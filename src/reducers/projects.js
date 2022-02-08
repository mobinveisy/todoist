import ACTION_TYPE from '../actions/constants';
let initializeState = {
    projects : [],
    active : null,
    addProject : {
        isActive : false,
        value : '',
    },
    deleteProject : {
        showConfirm : false,
        projectID : null,
    }
};

export default (state = initializeState, action) => {
    switch (action.type) {
        case ACTION_TYPE.FETCH_PROJECTS :
            return {...state, projects: [...action.payload.projects]};
        case ACTION_TYPE.SET_ADD_PROJECT_VALUE :
            return {...state, addProject: {...state.addProject, value : action.payload.value}}
        case ACTION_TYPE.SET_ADD_PROJECT_ACTIVE :
            return {...state, addProject: {...state.addProject, isActive : action.payload.isActive}}
        case ACTION_TYPE.RESET_ADD_PROJECT :
            return {...state, addProject: {...initializeState.addProject}};
        case ACTION_TYPE.SET_DELETE_PROJECT_SHOW_CONFIRM :
            return {...state, deleteProject: { showConfirm: action.payload.showConfirm, projectID: action.payload.projectID }};
        case ACTION_TYPE.SET_ACTIVE_PROJECT :
            return {...state, active: action.payload.active};
        default :
            return state;
    }
}