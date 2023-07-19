import React from 'react'

const Header = () => {
  return (
    <header>
    <a href="/" className="logo">MyBlog</a>
    <nav>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </nav>
  </header>
  )
}

export default Header