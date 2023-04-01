const initialState = {
    user : null
}

const reducer = (state,action)=>{
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user : action.user
            }
            break;
        default:
            return state        
            break;
    }
}

export {initialState}
export default reducer;

