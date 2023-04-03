import axios from 'axios'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo, userLogin } from '../services/userService';

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Login({ setUser }) {

    const navigate = useNavigate()

    // const userRef = useRef()
    // const passRef = useRef()
    
    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let newform = {
        //     username: userRef.current.value,
        //     password: passwordRef.current.value
        // }
        // setForm(newform)
        const token = await userLogin(form)

        if (!token) {
            setForm(emptyForm)
            return
        }

        localStorage.setItem("token", token)

        const user = await userInfo()
        setUser(user)

        navigate('/trails')
    }

    return ( 
        <div className='user-auth'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usnm">Username:</label>
                <br />
                <input 
                    type="text" 
                    id="usnm"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                />
                <br /><br />
                <label htmlFor="pss">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="pss"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
     );
}

export default Login;