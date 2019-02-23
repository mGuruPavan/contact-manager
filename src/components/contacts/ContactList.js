import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';


class ContactList extends React.Component{
    constructor(){
        super()
        this.state = {
            contacts:[]
        }
    }

    componentDidMount(){
        axios.get('/contacts',{
            headers : {
               'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const  contacts = response.data
            console.log(contacts)
            this.setState(()=>({contacts}))

        })
        .catch((err)=> {
            console.log('err',err)
        })
    }

    render(){
        return(
            <div>
                <h2>Listing Contacts - {this.state.contacts.length}</h2>
                <ul>
                    { this.state.contacts.map((contact)=>{
                        return <li key = {contact._id}><Link to= {`/contacts/${contact._id}`}> {contact.name} </Link>- {contact.mobile}</li>
                    })}
                </ul>

            <Link to ='/contacts/new'>Add Contact </Link>
            </div>
        )
    }
}
export default ContactList