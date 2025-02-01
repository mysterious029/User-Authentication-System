
export const setError = (errorMessage)=>({
    type: 'ERROR',
    payload: errorMessage,
})

export const setEmailForNewPassword = (email)=>({
    type: 'RESET',
    payload: email
})


export const setChooseEmployeDashBoardByElement = (chooseElement)=>({
    type: 'CHOOSEADMINEMPLOYEELEMENT',
    payload: chooseElement
})



