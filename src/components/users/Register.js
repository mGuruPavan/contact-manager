import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            noticeMessage: false
        }
        // handle this binding in constructor
        this.emailChange = this.emailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    // es6 arrow function for event handlers where you dont bind the this keyword
    userNameChange = (e) => {
        const username = e.target.value
        this.setState(() => ({ username }))
    }

    // regular method bound in the state
    emailChange(e) {
        const email = e.target.value
        this.setState(() => ({ email }))

    }

    // bound in the event handler
    passwordChange(e) {
        const password = e.target.value
        this.setState(() => ({ password }))
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password

        }
        axios.post('/users/register', formData)
            .then((response) => {
                this.setState(() => ({
                    noticeMessage: response.data.notice,
                    username: '',
                    email: '',
                    password: ''
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>

                <h2> register with us </h2>
                {this.state.noticeMessage && <p>{this.state.noticeMessage}</p>}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username
                        <input type='text' value={this.state.username} onChange={this.userNameChange} />
                    </label> <br />
                    <label>
                        email
                        <input type='text' value={this.state.email} onChange={this.emailChange} />
                    </label> <br />
                    <label>
                        password
                        {/* binding this while calling events*/}
                        <input type='password' value={this.state.password} onChange={this.passwordChange.bind(this)} />
                    </label> <br />
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default Register