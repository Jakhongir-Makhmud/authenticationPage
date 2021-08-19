import React, { useEffect, useState, useRef, Suspense } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetched_successfully, fetching_failed } from './../reduxStore/actionCreators'
import Table from './table/Table'
import './style/userPage-style.css'

function UserPage({authorized,JWT,data}) {
    

   const [numberOfProduct, setNumberOfProduct] = useState(10)
   const [number, setNumber] = useState(10)
   const [ArrayOfItems, setArrayOfItems] = useState([data.items]);
   const isFetched = useRef(false);
   const isMounted = useRef(false)
   const [initalizeSortFunc, setInitalizeSortFunc] = useState(true);
   const dispatch = useDispatch()
    const submitHandler = e => {
        e.preventDefault()
        setNumberOfProduct(number)
        setInitalizeSortFunc(true)

    }

    function sortFunc(str = '', array = data.items ) {
        if (str === '') {
            setArrayOfItems([...array])
            return null
        }
        let arr = [...array]
        let output = [];
        let strLeng = str.length
     
        for (let i = 0; i <= arr.length -1 ; i++) {
            let sliced = arr[i].name.slice(0,strLeng)
        
            if (sliced.toLowerCase() === str.toLowerCase()) {
                output.push(arr[i])
                 arr.splice(i,1)
             }
             output = output.sort();
        }

        for (let item of arr) {
            let word = item.name.split(' ').join('').toLowerCase()
 
            for (let k=0; k<=word.length;k++) {

                let partOfWord = '';

             for (let j = k; j <= k + strLeng ; j++) {

                   partOfWord += word[j]
                if (partOfWord == str) output.push(item)

             }

             partOfWord = '';

            }

        }

        setArrayOfItems([...output])
        return false


    }
    

    useEffect(() => {

        if (isMounted.current) {

        const url = `https://face.ox-sys.com/variations?size=${numberOfProduct}&page=1`
        const xhr = new XMLHttpRequest()
    
        xhr.open('GET', url)
    
        xhr.responseType = 'json'
        xhr.setRequestHeader('Authorization', `Bearer ${JWT}`)

        xhr.onload = function() {
            if (xhr.status === 200) {

                dispatch(fetched_successfully(xhr.response))
                isFetched.current = true
                setArrayOfItems([xhr.response.items])
                setInitalizeSortFunc(true)
                
            } else dispatch(fetching_failed(xhr.response))
        } 
        xhr.onerror = () => {
            alert('Произошла ошибка с соединением!')
        }

        xhr.send()
        } else isMounted.current = true

    },[numberOfProduct])

   
    if (isFetched && ArrayOfItems[0] !== undefined && initalizeSortFunc) {
        sortFunc()
        setInitalizeSortFunc(false)
    }

    if (!authorized) {
        return <Redirect to='/login'/>
    }

    return (
        <div>
        
            <form style={{textAlign: 'center',marginTop: '50px'}} id='user-form'  onSubmit={(e) => submitHandler(e)}>
                <label style={{color: '#fff'}} htmlFor="numberOfProducts">число продуктов: </label><input name='numberOfProducts' onChange={(e) => setNumber(e.target.value)} type="number" />
                <br />
                <button type='submit'>submit</button>
            </form>

                <br />

              <input style={{width: '200px', height: '30px', display: 'block',margin: '0 auto'}} type="text" onChange={(e) => sortFunc(e.target.value, data.items) } /> 
           
                <br />

{
    isFetched && ArrayOfItems[0] !== undefined  ?  <Table items={ArrayOfItems}/>  : null
}
           
        

        </div>
    )
}

const stateToProp = state => ({
    authorized: state.login.authorized,
    JWT: state.login.JWT,
    data: state.data.data
})

export default connect(stateToProp)(UserPage)
