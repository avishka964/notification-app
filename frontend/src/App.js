import React, { useEffect, useState} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Card from './components/card/Card';
import { posts } from './data';
import {io} from 'socket.io-client'

const App = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null)

  useEffect(() => {
   setSocket(io('http://localhost:5000'))   
   
  }, [])

  useEffect(() => {
    socket?.emit('newUser', user)
  }, [socket, user])

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const userChange = () => {
    setUser(username);
  };

  console.log(user);

  return (
    <div className='container'>
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className='username'>{username}</span>
        </>
      ) : (
        <div className='login'>
          <input
            type='text'
            placeholder='username'
            onChange={onChangeUsername}
          />
          <button onClick={userChange}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
