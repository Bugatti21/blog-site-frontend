import React, { useState } from 'react'

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // async function register(ev) {
    
    
  //   ev.preventDefault();
  //   await fetch('http://localhost:4000/register', {
  //     method: 'POST',
  //     body: JSON.stringify({username, password}),
  //     headers: {'Content-Type':'application/json'},
  //   })
  // }

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Registration successful, handle the response as needed
        console.log('Registration successful');
      } else {
        // Registration failed, handle the error
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  }

  return (
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
        <button type='submit'>Register</button>
    </form>
  )
}

export default RegisterPage


