import React, { useState } from 'react'
import axios from 'axios'

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
            alert(response.data.message)
            console.log(response.data)
            setFormData({username: '', email: "", password: ''})
        } catch (error) {
            console.log('Signup Error:', error.response?.data);
            alert(error.response?.data?.message || "Something went wrong")
        }
    }
    

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange}   />
        <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}  />
        <button type='submit'>Signup</button>
      </form>
  )
}

export default Signup