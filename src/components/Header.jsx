import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./UserContext";


const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch('https://seun-u541.onrender.com/profile', {
      credentials: 'include', 
    }).then((response) => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

 
  function logout() {
    fetch('https://seun-u541.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <a href="/" className="logo">
        MyBlog
      </a>
      <nav>
        {username ? (
          <>
            <a href="/create">Create new post</a>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

