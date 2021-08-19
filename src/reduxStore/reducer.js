const login_initial_state = {
    JWT: '',
    error: '',
    authorized: false,
    loading: false
}

const logInReducer = (state = login_initial_state, action) => {
    switch (action.type) {
        case 'START_REQUEST': return {
            ...state, JWT: '', error: '', loading: true
        }
        case 'LOGGED_IN_SUCCESSFULL': return {
            ...state, JWT: action.payload, authorized:true, loading:false
        }
        case 'LOGGING_IN_FAILED': return {
            ...state, error: action.error, authorized: false, loading: false
        }
            
        default: return state;
    }
}

const data_request_initial_state = {
    data: {}
}

const dataRequestReducer = (state = data_request_initial_state, action) => {
    switch (action.type) {
        case 'FETCHED_SUCCESSFULLY': return {
            ...state, data: action.data
        }
        case 'FETCHING_FAILED' : return {
            ...state, error: action.error
        }
    
        default: return state;
    }
}


export {logInReducer, dataRequestReducer}

