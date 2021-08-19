const logged_in_successfull = (payload) => ({
    type: 'LOGGED_IN_SUCCESSFULL',
    payload
})

const logging_in_failed = (error) => ({
    type:'LOGGING_IN_FAILED',
    error
})

const startRrquest = () => ({
    type: 'START_REQUEST'
})

const fetched_successfully = data => ({
    type: 'FETCHED_SUCCESSFULLY',
    data
})

const fetching_failed = error => ({
    type: 'FETCHING_FAILED',
    error
})

export {logged_in_successfull, logging_in_failed,startRrquest,fetched_successfully,fetching_failed}