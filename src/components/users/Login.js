import React from 'react'
import axios from '../../config/axios'

import { Redirect } from 'react-router-dom'


class Login extends React.Component {
    constructor(){
        super()
        this.state ={
            email : '',
            password : '',
            redirect : false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    // creating one event handlers for all input fields , for this to work name prop is manidatory
    //regular you need to bind this keyword 
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name] : e.target.value
        }))
    }

   handleSubmit = (e) => {
       e.preventDefault()
       const formData = {
           email : this.state.email,
           password : this.state.password
       }
       // client side validations 
       console.log(formData)
       axios.post('/users/login',formData)
        .then((response)=>{
            const {token} = response.data
            localStorage.setItem('authToken',token)
            this.setState(()=>({ redirect:true }))
        })
        .catch((err)=>{
            console.log(err)
        })
   }

    render(){
        if(this.state.redirect){
            return <Redirect to ='/contacts' /> 
        }
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit= {this.handleSubmit}>
                    <label>
                        email
                        <input type ='text' value = {this.state.email} onChange={this.handleChange} name = 'email'/>
                    </label><br/>
                    <label>
                        password
                        <input type ='password' value = {this.state.password} onChange = {this.handleChange} name = 'password'/>
                    </label><br/>
                    <input type = 'submit'/>
                    
                </form>
            </div>
        )
    }
} 

export default Login