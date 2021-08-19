import React, { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { logged_in_successfull, logging_in_failed, startRrquest } from './../reduxStore/actionCreators'
import { useHistory } from 'react-router-dom'
import './style/login-style.css';

function Login({login}) {

    const {authorized,error,token} = login
    const history = useHistory()

const dispatch = useDispatch()
const isMounted = useRef(false)
const [isAuthenticated, setIsAuthenticated] = useState(false)

const [usernameInput, setUsernameInput] = useState('');
const [passwordInput, setPasswordInput] = useState('')

const [requestParam, setrequestParam] = useState({});


const [passwordToggle, setPasswordToggle] = useState(true);

const checkEquality = (a,b) => {
    const leng1 = Object.keys(a).length;
    const leng2 = Object.keys(b).length

    if (leng1 === leng2) return Object.keys(a).every( key => b.hasOwnProperty(key) && b[key] === a[key])
    return false

} 

const submitHandler = (e) => {
    e.preventDefault()


    if (!checkEquality(requestParam, {username: usernameInput,password: passwordInput})){ 
        
        setrequestParam({
        username: usernameInput,
        password: passwordInput
    })
    // dispatch(startRrquest())
}

}

useEffect(() => {

 if (isMounted.current) {

   
    const url = 'https://face.ox-sys.com/security/auth_check'

    const xhr = new XMLHttpRequest()

xhr.open('post', url)
xhr.responseType = 'json'
xhr.setRequestHeader('content-Type' ,'application/x-www-form-urlencoded')



xhr.onload = () => {
    if (xhr.status === 200) {

        dispatch(logged_in_successfull(xhr.response.token))
    if (xhr.status === 401) setIsAuthenticated(true)
    } else dispatch(logging_in_failed(xhr.response))
}

xhr.onerror = () => {
        alert('Произошла ошибка с соединением!')
    }

    
xhr.send(`_username=${requestParam.username}&_password=${requestParam.password}&_subdomain=face`)

 } else isMounted.current = true

},[requestParam])

if (authorized && (error === '')) {
    history.push(`/user/`)
}

    return (
        <div id="login-form-container">
            {isAuthenticated ? <p>Username or password incorrect!!!</p> : null}
            <form className="login-form"  onSubmit={(e) => submitHandler(e)}>
                <input className="form-item text-input" type="text" placeholder='enter username' value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required/>
                <input className="form-item text-input" type={passwordToggle ? 'password' : 'text'} onChange={(e) => setPasswordInput(e.target.value)} placeholder='enter password' required />
                <input className="form-item checkbox" type="checkbox" onClick={() => setPasswordToggle(!passwordToggle)} />
                <button className="form-item" type='submit'>Login</button>
            </form>
        </div>
    )

}


const stateToProp = state => ({
    login: state.login
})

export default connect(stateToProp)(Login)
