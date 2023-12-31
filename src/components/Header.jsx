import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "./UserContext";


const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(process.env.BACKEND_URL + '/profile', {
      credentials: 'include', 
    }).then((response) => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

 
  function logout() {
    fetch(process.env.BACKEND_URL + '/logout', {
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

