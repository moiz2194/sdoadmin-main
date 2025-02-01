import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import context from '../context/context.js';
import './login.css'
const Signin = () => {
  const a = useContext(context);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('')
  const login = a.login;

  return (
    <div className='container my-5'>
      <section class="content ">
        <div class="row mt-5">
          <div class="col-md-6 w30">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Login</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label for="username">UserName</label>
                  <input type="text" id="username" placeholder='Enter Username' class="form-control" value={username} onChange={(e) => { setusername(e.target.value) }} />
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" class="form-control" placeholder='Enter password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                </div>
              </div>
              <div class="card-footer">
                <div class="col-12 ">
                  <button style={{padding:"9px 22px"}} class="btn btn-success purple float-right" onClick={() => {
                    login({ username, password });
                  }}>
                    Signin
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Signin