import React,{ useState }  from 'react'
import axios from 'axios'

function signin() {
     const [formData, setFormData] = useState({
           email: '',
           password: '',
       })

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try {
           const response = await axios.post('http://localhost:3000/api/auth/login', {
            email: formData.email,
            password: formData.password
           })
           alert(response.data.message);
           localStorage('token', response.data.token)
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed")
        }
        
    }

  return (
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}  />
        <button type='submit'>Signup</button>
      </form>
  )
}

export default signin