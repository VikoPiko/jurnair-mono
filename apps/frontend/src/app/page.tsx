'use client';

import React, { useState } from 'react';

const page = () => {
  const [response, setRes] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleResponse = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/test');

      if (!res.ok) {
        console.log('OOPSIEE');
      }
      const data = await res.json();
      setRes(data.message);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const reset = () => {
    setRes('');
  };

  const handleSign = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!res.ok) {
        return 'Error during signup';
      }
      const data = await res.json();
      console.log(`Returned new user: `, data);
      return data;
    } catch (error) {
      console.error(error);
      return 'error';
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/get-users');
      if (!res.ok) {
        console.error('yo smthn not workinn');
      }
      const data = await res.json();
      console.log(`Users: `, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!res.ok) {
        console.log('oopsies');
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const tryProtected = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/protected', {
        credentials: 'include',
      });
      if (!res.ok) {
        console.log('smthn broke boss');
      }
      const message = await res.json();
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-xl font-bold text-black">
      {response ? <div>{response}</div> : <h1>No fetch yet...</h1>}

      <form>
        <div className="flex my-2 gap-4">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border border-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex my-2 gap-4">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="border border-black"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>

      <div className="flex flex-col items-center justify-center m-2 p-1">
        <button onClick={handleResponse}>Run test</button>
        <button onClick={reset}>Reset</button>
        <button onClick={() => handleSign(email, password)}>sign</button>
        <button onClick={() => handleLogin(email, password)}>login</button>
        <button onClick={getAllUsers}>getUsers</button>
        <button onClick={tryProtected}>tryProtected</button>
      </div>
    </div>
  );
};

export default page;
