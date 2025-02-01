const initalStateForError = {
    errorMessage: "",
    forResetEmail: "",
    chooseAdminEmployeElement: "",
    chooseAdminMoreItem: "",
    token: ""
}


export const reducerForStore = (state = initalStateForError, action)=>{
    switch (action.type){
        case 'ERROR':
            return {
            ...state,
            errorMessage: action.payload
            }
        case 'RESET':
            return {
                ...state,
                forResetEmail: action.payload
            }
        case 'CHOOSEADMINEMPLOYEELEMENT':
            return {
                ...state,
                forChooseAdminEmployeElement: action.payload
            }
        default: 
        return state;
    }


}