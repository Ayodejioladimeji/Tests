import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { CLIENT_ID } = process.env;

  // The section of the google login
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post('/user/google_login', {
        tokenId: response.tokenId,
      });

      setValues({ ...values });

      localStorage.setItem('firstLogin', true);

      setTimeout(() => {
        window.location.href = '/profile';
      }, 2000);
    } catch (err) {
      setValues({ ...values });
      console.log(err.response.data.msg);
    }
  };

  return (
    <div className='login'>
      <div>
        <ul>
          <li>Login to continue</li>

          <li>
            <div>
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText='Google Signin'
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>

            <div>
              <form>
                <div>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='email'
                    name='email'
                    placeholder='Email'
                  />
                </div>

                <div className='col-md-12 pass'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    id='password'
                    placeholder='**********'
                  />
                </div>

                <div>
                  <button type='submit'>Login</button>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
