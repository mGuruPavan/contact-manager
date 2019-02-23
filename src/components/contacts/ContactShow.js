import React from 'react'
import {Link } from 'react-router-dom'
import axios from '../../config/axios';

class ContactShow extends React.Component{
    constructor(){
        super()
        this.state ={
            contact : {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`contacts/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const contact = response.data
            this.setState(()=>({ contact }))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
               <h2>{this.state.contact.name}</h2>
               <p>{this.state.contact.email} - {this.state.contact.mobile}</p>

               <Link to = '/contacts' > back </Link> 
            </div>
        )
    }
}

export default ContactShow